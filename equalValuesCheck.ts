type Obj = { [prop: string]: any }

function logValue(value: any) {
  if (typeof value === "function") {
    return "[function]"
  } else {
    return String(value)
  }
}

export function createEqualValuesChecker(
  propsToCheck?: string[],
  debug?: boolean
) {
  let propsToCheckObj: { [prop: string]: boolean } | undefined
  if (propsToCheck) {
    propsToCheckObj = {}
    propsToCheck.forEach((prop) => {
      if (propsToCheckObj) propsToCheckObj[prop] = true
    })
  }

  return (currentVal: Obj, previousVal: Obj): boolean => {
    const changedProps = [] as Array<string>

    let equal = true

    for (const property in currentVal) {
      if (debug && currentVal[property] !== previousVal[property])
        changedProps.push(property)

      if (equal && (!propsToCheckObj || propsToCheckObj[property]))
        equal = currentVal[property] === previousVal[property]
    }

    if (debug) {
      console.log(
        `[${equal ? "EQUAL" : "NOT EQUAL"}] CHANGED PROPS:\n` +
          changedProps
            .map((prop) => {
              const logPrev = logValue(previousVal[prop])
              const logCurrent = logValue(currentVal[prop])
              return `${prop} (${logPrev} -> ${logCurrent})`
            })
            .join("\n")
      )
    }
    return equal
  }
}

export const equalValuesCheck = createEqualValuesChecker()
