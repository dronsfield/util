type MaybeString = string | undefined | null
export function stringIncludes(
  str: MaybeString,
  substring: MaybeString
): boolean {
  if (!str || !substring) return false
  return str.toLowerCase().indexOf(substring.toLowerCase()) > -1
}
export function stringStartsWith(str: MaybeString, char: MaybeString): boolean {
  if (!str || !char) return false
  return str.toLowerCase().slice(0, 1) === char.toLowerCase()
}
