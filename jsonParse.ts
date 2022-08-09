export function jsonParse(input: any) {
  try {
    const parsed = JSON.parse(input)
    return parsed
  } catch (err) {
    return null
  }
}
