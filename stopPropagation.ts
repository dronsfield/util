type HandleMouseEvent = (evt: React.MouseEvent<Element>) => void

export function stopPropagation(func?: HandleMouseEvent): HandleMouseEvent {
  return (evt) => {
    evt.stopPropagation()
    if (func) func(evt)
  }
}
