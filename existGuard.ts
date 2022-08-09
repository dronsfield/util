import { Maybe } from "./utilityTypes"

export function existGuard<T>(input: Maybe<T>): input is T {
  return Boolean(input)
}
