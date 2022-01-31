import { ResponsiveChoroplethCanvas, ResponsiveChoropleth } from '@nivo/geo'
import { useEffect, useMemo, useRef, useState } from 'react'
import { clamp, debounce, DivRef, reverse, throttle } from '../../../utils'
import './WorldMap.css'
import { geoData } from '../data/geoData'
import { geoFeatures } from './geoFeatures'
import { colors } from '../../../theme'
import useWindowSize from '../../../utils/hooks/useWindowSize'

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
  const { width } = useWindowSize()
  const { lambda, phi } = useTranslateByDrag(ref)
  const scale = useScaleByWheel(ref)

  return (
    <div className="map" ref={ref}>
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
        projectionRotation={[lambda, phi, 0]}
        projectionScale={width * scale}
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
  lambda = -27 // +-180
  phi = -14 // +-90
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

class State {
  isShiftPressed = false
  scale = 0.2135
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
      return { ...old, scale: clamp(old.scale - delta / 1e2, 0.2135, 0.4) }
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

interface TooltipP {
  color: string
  country: string
  value: number
  wounded: number
  killed: number
}

function Tooltip({ color, country, killed, value, wounded }: TooltipP) {
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
