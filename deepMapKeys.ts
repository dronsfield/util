type Obj = { [k: string]: any }
function isObj<T>(input: T | Obj): input is Obj {
  return input && typeof input === "object"
}
const DEPTH_LIMIT = 3
const deepMapKeys = (
  obj: Obj,
  transform: (x: string) => string,
  depth: number = 0
): Obj => {
  if (typeof obj !== "object") return obj
  if (Array.isArray(obj)) {
    if (depth < DEPTH_LIMIT) {
      return obj.map((li) => deepMapKeys(li, transform, depth + 1))
    } else {
      return obj
    }
  }
  return Object.keys(obj).reduce<Obj>((prev, key) => {
    const val = obj[key]
    const newVal =
      val && isObj(val) && depth < DEPTH_LIMIT
        ? deepMapKeys(val, transform, depth + 1)
        : val
    const next = { ...prev, [transform(key)]: newVal }
    return next
  }, {})
}

export default deepMapKeys
