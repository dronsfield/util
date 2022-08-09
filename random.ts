import { createArray } from "./createArray"

export function randomKey(n = 6) {
  const num = Math.random()
  const str = num.toString(36)
  const sub = str.substring(2, 2 + n)
  return sub
}

export function randomInt(max: number) {
  return Math.round(Math.random() * (max + 1)) % (max + 1)
}

export function randomDigit() {
  return randomInt(9)
}

export function randomLetters(n: number) {
  return createArray(n)
    .map(() => String.fromCharCode(97 + randomInt(25)))
    .join("")
}
