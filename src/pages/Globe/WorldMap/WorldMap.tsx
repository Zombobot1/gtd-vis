import { ResponsiveChoroplethCanvas, ResponsiveChoropleth } from '@nivo/geo'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { clamp, debounce, DivRef, equalNum, reverse, throttle } from '../../../utils'
import './WorldMap.css'
import { geoData } from '../data/geoData'
import { geoFeatures } from './geoFeatures'
import { colors } from '../../../theme'
import useWindowSize from '../../../utils/hooks/useWindowSize'
import { useIsMobile } from '../../../utils/hooks/useIsMobile'
import { useGesture } from '@use-gesture/react'

type Data = {
  id: string
  value: number
  killed: number
  wounded: number
}[]

export interface WorldMap {
  data: Data
  onCountryClick: (country: string) => void
}

export function WorldMap({ data, onCountryClick }: WorldMap) {
  const ref = useRef<HTMLDivElement>(null)
  const { width, height } = useWindowSize()
  const { lambda, phi } = useGestureTransformations(ref)
  const scale = useScaleByWheel(ref)
  let scaleDelta = height >= 1080 ? HIGH_SCREEN_DELTA : 0
  if (width <= 600) scaleDelta = MOBILE_SCREEN_DELTA

  return (
    <div className="map">
      <ResponsiveChoropleth
        data={data}
        features={geoFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={reverse(colors)}
        domain={[0, 400]}
        unknownColor="#2e0000"
        label="properties.name"
        projectionType="orthographic"
        projectionTranslation={[0.5, 0.5]}
        // projectionRotation={[lambda, phi, 0]} -78.3720703125, phi: 38.65283203125,
        projectionRotation={[-80, 37, 0]}
        // projectionScale={width * (scale + scaleDelta)}
        projectionScale={400}
        borderWidth={0.5}
        borderColor="#152538"
        onClick={(e) => onCountryClick(e.data.id)}
        tooltip={(e) => {
          return (
            <Tooltip
              country={e.feature.label}
              killed={e.feature.data?.killed}
              wounded={e.feature.data?.wounded}
              value={e.feature.value}
              color={e.feature.color}
            />
          )
        }}
      />
    </div>
  )
}

class Coordinates {
  initX = -1
  initY = -1
  draggedX = 0
  draggedY = 0
  lambda = -27
  phi = -14
}

function useTranslateByDrag(ref: DivRef) {
  const [coordinates, setCoordinates] = useState(new Coordinates())

  const onMouseMove_ = (e: MouseEvent) => {
    const { pageX, pageY } = e
    setCoordinates((old) => {
      const newDraggedX = pageX - old.initX
      const newDraggedY = pageY - old.initY
      const deltaX = newDraggedX - old.draggedX
      const deltaY = newDraggedY - old.draggedY
      return {
        ...old,
        draggedX: newDraggedX,
        draggedY: newDraggedY,
        lambda: clamp(old.lambda + deltaX / 4, -180, 180),
        phi: clamp(old.phi - deltaY / 8, -90, 90),
      }
    })
  }

  const onMouseMove = useMemo(() => throttle(onMouseMove_, 10), [])

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const { pageX, pageY } = e
      setCoordinates((old) => ({
        ...old,
        draggedX: 0,
        draggedY: 0,
        initX: pageX,
        initY: pageY,
      }))
      window.addEventListener('mousemove', onMouseMove)
    }

    const onMouseUp = () => window.removeEventListener('mousemove', onMouseMove)

    ref.current?.addEventListener('mousedown', onMouseDown)
    ref.current?.addEventListener('mouseup', onMouseUp)

    return () => {
      ref.current?.removeEventListener('mousedown', onMouseDown)
      ref.current?.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return {
    lambda: coordinates.lambda,
    phi: coordinates.phi,
  }
}

const SCALE = 0.205 // 0.2135 .9 * .65 * .7 / 2
const HIGH_SCREEN_DELTA = 0.27 - SCALE
const MOBILE_SCREEN_DELTA = 0.437 - SCALE
const MAX_SCALE = 0.5

class State {
  isShiftPressed = false
  scale = SCALE
}

function useScaleByWheel(ref: DivRef) {
  const [scale, setScale] = useState(new State())

  useEffect(() => {
    const onWheel = (e: MouseEvent) => e.preventDefault()
    if (scale.isShiftPressed) {
      window.addEventListener('wheel', onWheel, { passive: false })
      return () => window.removeEventListener('wheel', onWheel)
    }
  }, [scale.isShiftPressed])

  const onKeyDown = (e: KeyboardEvent) => {
    setScale((old) => ({ ...old, isShiftPressed: e.shiftKey }))
  }

  function onWheel_(e: WheelEvent) {
    setScale((old) => {
      if (!old.isShiftPressed) return old
      const delta = Math.sign(e.deltaY)
      return { ...old, scale: clamp(old.scale - delta / 1e2, SCALE, MAX_SCALE) }
    })
  }

  const onWheel = useMemo(() => debounce(onWheel_, 2), [])

  useEffect(() => {
    ref.current?.addEventListener('wheel', onWheel)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyDown)
    return () => {
      ref.current?.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyDown)
    }
  }, [])

  return scale.scale
}

type Drag = { offset: number[] }

function useGestureTransformations(ref: DivRef) {
  const [dragged, setDragged] = useState({ dx: 0, dy: 0, lambda: -27, phi: -14, active: true })
  const [pinched, setPinched] = useState('')
  console.log(dragged)
  const onDrag = useCallback(
    throttle(({ offset: [dx, dy] }: Drag) => {
      setDragged((old) => {
        if (!old.active) return old
        const lambda = clamp(old.lambda + (dx - old.dx) / 4, -180, 180)
        const phi = clamp(old.phi - (dy - old.dy) / 8, -90, 90)
        // lambda: -72.728515625, phi: 31.65771484375
        // lambda: -39.9384765625, phi: -0.28466796875
        // lambda: -46.4482421875, phi: 7.48046875,
        return { ...old, lambda, phi, dx, dy }
      })
    }, 10),
    [],
  )

  useGesture(
    {
      onDrag,
      onWheel: ({ movement }) => {
        setPinched(`y: ${Math.round(movement[1])}`)
      },
      onPinchStart: () => setDragged((old) => ({ ...old, active: false })),
      onPinchEnd: () => setDragged((old) => ({ ...old, active: true })),
      onPinch: ({ movement }) => {
        setPinched(`y: ${Math.round(movement[1])}`)
      },
    },
    { target: ref, drag: { threshold: 10 } },
  )

  return { lambda: dragged.lambda, phi: dragged.phi }
}

interface TooltipP {
  color: string
  country: string
  value: number
  wounded: number
  killed: number
}

function Tooltip({ color, country, killed, value, wounded }: TooltipP) {
  const mobile = useIsMobile()
  if (mobile) return null
  return (
    <div className="tooltip">
      <div className="tooltip-circle" style={{ backgroundColor: color }} />
      <div className="tooltip-header">{country}</div>
      <table>
        <tbody>
          <tr>
            <td>Incidents</td>
            <td className="tooltip-value">{value}</td>
          </tr>
          <tr>
            <td>Killed</td>
            <td className="tooltip-value">{killed}</td>
          </tr>
          <tr>
            <td>Wounded</td>
            <td className="tooltip-value">{wounded}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
