import './Slider.css'

import { useEffect, useRef, useState } from 'react'

import { clamp, DivRef, isIn, State } from '../../utils'
import { useUpdateEffect } from '../hooks/useUpdateEffect'

export interface Slider {
  points: number[]
  currentIndexS: State<number>
}

export function Slider({ points, currentIndexS: currentIndexS }: Slider) {
  const thumbRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const delta = (1 / (points.length - 1)) * 100
  const [state, setState] = useTranslateByDrag(thumbRef, sliderRef, delta, currentIndexS, points.length)

  const atEnd = state.i === 0 || state.i === points.length - 1
  const left = state.i * delta

  return (
    <div className="slider-container">
      <div className="slider-edge slider-edge-left">{points[0]}</div>
      <div
        className="slider-body-container"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const rx = e.clientX - rect.left
          const clickedFromLeft = (rx / (sliderRef.current?.offsetWidth || 0)) * 100

          setState((old) => {
            const translateX = old.i * delta
            if (isIn(clickedFromLeft, translateX - delta / 2, translateX + delta / 2)) return old

            return {
              i: Math.round(clickedFromLeft / delta),
              prevX: -1,
            }
          })
        }}
      >
        <div className="slider-body" ref={sliderRef}>
          <div className="slider-active" style={{ width: left + '%' }} />
          {points.map((p, i) => {
            const isActive = left >= delta * i
            const style = isActive
              ? {
                  border: 'none',
                  backgroundColor: '#180000',
                  transform: 'translate(0, 15%)',
                }
              : {}

            return <div key={p} className="slider-mark" style={{ ...style, left: delta * i + '%' }} />
          })}
          <div className="slider-thumb-container" style={{ left: left + '%' }} ref={thumbRef} tabIndex={1}>
            <div className="slider-thumb" data-current={atEnd ? '' : points[state.i]} />
          </div>
        </div>
      </div>
      <div className="slider-edge slider-edge-right">{points[points.length - 1]}</div>
    </div>
  )
}

class SliderState {
  prevX = -1
  i = 0
}

function useTranslateByDrag(
  thumbRef: DivRef,
  sliderRef: DivRef,
  delta: number,
  currentIndexS: State<number>,
  size: number,
): State<SliderState> {
  const [currentIndex, setCurrentIndex] = currentIndexS
  const stateS = useState<SliderState>({ prevX: -1, i: currentIndex })
  const [state, setState] = stateS

  useUpdateEffect(() => setCurrentIndex(state.i), [state.i]) // update parent
  useUpdateEffect(() => {
    if (state.i === currentIndex) return
    setState({ prevX: -1, i: currentIndex })
  }, [currentIndex]) // get update from parent

  const onMouseMove = (e: MouseEvent) => {
    let { pageX } = e
    setState((old) => {
      let deltaX = pageX - old.prevX
      const width = sliderRef.current?.offsetWidth || 0

      if ((Math.abs(deltaX) / width) * 100 > delta / 1.45) {
        while ((Math.abs(deltaX) / width) * 100 < delta) {
          pageX += deltaX > 0 ? 1 : -1
          deltaX = pageX - old.prevX
        }

        return {
          prevX: pageX,
          i: clamp(old.i + (deltaX > 0 ? 1 : -1), 0, size - 1),
        }
      }

      return old
    })
  }

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const { pageX } = e
      setState((old) => ({
        ...old,
        prevX: pageX,
      }))
      window.addEventListener('mousemove', onMouseMove)
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
    }

    thumbRef.current?.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      thumbRef.current?.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return stateS
}
