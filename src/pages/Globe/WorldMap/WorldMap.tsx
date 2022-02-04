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
import { countryMapping } from '../data/countryMapping'

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
  const { lambda, phi, scale } = useGestureTransformations(ref)

  let scaleDelta = height >= 1080 ? HIGH_SCREEN_DELTA : 0
  if (width <= 600) scaleDelta = MOBILE_SCREEN_DELTA

  return (
    <div className="map" ref={ref}>
      <ResponsiveChoroplethCanvas // svg causes bug on rotation in safari
        data={data}
        features={geoFeatures.features} // https://geojson-maps.ash.ms/
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={reverse(colors)}
        domain={[0, 75]}
        unknownColor="#2e0000"
        label="properties.name"
        projectionType="orthographic"
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[lambda, phi, 0]}
        projectionScale={width * (scale + scaleDelta)}
        borderWidth={0.5}
        borderColor="#152538"
        onClick={(e) => onCountryClick(e.data.id)}
        tooltip={(e) => {
          return (
            <Tooltip
              id={(e.feature as any).id}
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
const SCALE = 0.205 // 0.2135 .9 * .65 * .7 / 2
const HIGH_SCREEN_DELTA = 0.27 - SCALE
const MOBILE_SCREEN_DELTA = 0.437 - SCALE
const MAX_SCALE = 0.5

type Drag = { offset: number[] }

function useGestureTransformations(ref: DivRef) {
  const [dragged, setDragged] = useState({ dx: 0, dy: 0, lambda: -27, phi: -14, active: true })
  const [pinched, setPinched] = useState(SCALE)

  const onDrag = useCallback(
    throttle(({ offset: [dx, dy] }: Drag) => {
      setDragged((old) => {
        if (!old.active) return old
        const lambda = clamp(old.lambda + (dx - old.dx) / 4, -180, 180)
        const phi = clamp(old.phi - (dy - old.dy) / 8, -90, 90)
        return { ...old, lambda, phi, dx, dy }
      })
    }, 10),
    [],
  )

  const onWheel = useCallback(
    debounce(({ delta: [_, dy], shiftKey }) => {
      if (shiftKey) {
        setPinched((old) => clamp(old - dy / 1e2, SCALE, MAX_SCALE))
      }
    }, 2),
    [],
  )

  const onPinch = useCallback(
    debounce(({ delta: [dx] }) => {
      setPinched((old) => {
        return clamp(old + Math.sign(dx) / 30, 0.2, 0.5)
      })
    }, 2),
    [],
  )

  useGesture(
    {
      onDrag,
      onWheel,
      onPinchStart: () => setDragged((old) => ({ ...old, active: false })),
      onPinchEnd: () => setTimeout(() => setDragged((old) => ({ ...old, active: true })), 100),
      onPinch,
    },
    { target: ref, drag: { threshold: 10 } },
  )

  return { lambda: dragged.lambda, phi: dragged.phi, scale: pinched }
}

interface TooltipP {
  id: string
  color: string
  country: string
  value: number
  wounded: number
  killed: number
}

function Tooltip({ id, color, country, killed, value, wounded }: TooltipP) {
  const mobile = useIsMobile()
  if (mobile) return null
  return (
    <div className="tooltip">
      <div className="tooltip-circle" style={{ backgroundColor: color }} />
      <div className="tooltip-header">{country || (countryMapping as any)[id]}</div>
      {country && (
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
      )}
      {!country && <p>No data available</p>}
    </div>
  )
}
