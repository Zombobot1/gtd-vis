export const equalNum = (num1: number, num2: number) => {
  return Math.abs(num1 - num2) < Number.EPSILON
}

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export const isIn = (value: number, min: number, max: number) => {
  return value >= min && value <= max
}

export const throttle = (fn: Function, wait: number = 300) => {
  let inThrottle: boolean, lastFn: ReturnType<typeof setTimeout>, lastTime: number
  return function (this: any) {
    const context = this,
      args = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}

export const debounce = <T extends (...args: any[]) => any>(callback: T, waitFor: number) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      result = callback(...args)
    }, waitFor)
    return result
  }
}

export function copyTextToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(
    () => console.info('Async: Copying to clipboard was successful!'),
    (err) => console.error('Async: Could not copy text: ', err),
  )
}

export const generate = <T = number>(length: number, f: (i: number) => T = (n: any) => n): T[] =>
  Array(length)
    .fill(undefined)
    .map((_, i) => f(i))

export const rnd = (max: number) => Math.floor(Math.random() * max)

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type State<T> = [T, SetState<T>]

export type DivRef = React.RefObject<HTMLDivElement>

const _sum = (p: number, v: any): number => p + v
export const sum = <T>(arr: T[], f: (p: number, v: T) => number = _sum): number => arr.reduce(f, 0)
export const reverse = <T>(array: T[]): T[] => array.map((_, idx) => array[array.length - 1 - idx])
export const sort = <T>(arr: T[], toNum: (element: T) => number = (e) => e as unknown as number): T[] => {
  arr.sort((a, b) => toNum(a) - toNum(b))
  return arr
}
