import { Maybe } from "./utilityTypes"

export function copyElementText(el: Maybe<HTMLElement>): boolean {
  try {
    if (!el) return false
    if (window.getSelection) {
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(el)
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand("Copy")
        selection.removeAllRanges()
        return true
      } else {
        return false
      }
    } else {
      const body = document.body as any
      if (body.createTextRange) {
        const range = body.createTextRange()
        range.moveToElementText(el)
        range.select()
        document.execCommand("Copy")
        return true
      } else {
        return false
      }
    }
  } catch (err) {
    return false
  }
}
