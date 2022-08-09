import { Maybe, ValueOf } from "src/util/utilityTypes"

export const phoneNumberFormats = {
  USA: "(000) 000-0000"
} as const
export type PhoneNumberFormat = ValueOf<typeof phoneNumberFormats>

export interface PhoneNumberValue {
  internationalCode: string
  nationalNumber: string
}

const digitString = "0123456789"
function isCharADigit(char: string) {
  return digitString.indexOf(char) > -1
}

const memoize = <T>(x: T) => x // TODO
const getLengthFromFormat = memoize((format: PhoneNumberFormat) => {
  // this isn't functional but it is FAST
  let total = 0
  for (let ii = 0; ii < format.length; ii++) {
    if (format[ii] === "0") total++
  }
  return total
})

const nationalNumber = {
  // convert masked/formatted national number value
  // back to just digits.
  // eg: 3iuy43t&84-y -> 34384
  // or (123) 456-7890 -> 1234567890
  // 2nd param (format) only limits the length
  getDigits: (input: Maybe<string>, format: PhoneNumberFormat): string => {
    if (!input) return ""
    const allowedLength = getLengthFromFormat(format)
    const digitsOnly = input
      .split("")
      .filter(isCharADigit)
      .join("")
      .slice(0, allowedLength)
    return digitsOnly
  },

  // convert just digits to a formatted string.
  // the format string should contain 0s where you want digits
  // to be inserted.
  // eg: ("1231231234", "(000) 000-0000") -> "(123) - 123-1234"
  getFormatted: (input: Maybe<string>, format: PhoneNumberFormat): string => {
    if (!input) return ""
    let ii = 0
    return format.replace(/0/g, () => {
      const char = input[ii]
      ii++
      return char || " "
    })
  }
}

// convert a PhoneNumberValue to a formatted string.
// look at nationalNumber.getFormatted for more deets.
const getFormatted = (
  input: Maybe<PhoneNumberValue>,
  format: PhoneNumberFormat
): string => {
  if (!input) return ""
  return (
    input.internationalCode +
    " " +
    nationalNumber.getFormatted(input.nationalNumber, format)
  )
}

const create = (
  internationalCode: string,
  nationalNumber: string
): PhoneNumberValue => {
  return { internationalCode, nationalNumber }
}

export const phoneNumbers = {
  nationalNumber,
  getFormatted,
  create
}
