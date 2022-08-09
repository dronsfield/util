export function debounce<A>(
  func: (...args: A[]) => void,
  wait: number,
  immediate?: boolean
): (...args: A[]) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined

  return function (...args: A[]) {
    const later = function () {
      timeout = undefined
      if (!immediate) return func(...args)
    }
    let callNow = Boolean(immediate && !timeout)
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) return func(...args)
  }
}
