import React from "react"

export function template(
  templateString: string,
  params: { [key: string]: string | number }
) {
  const replaced = templateString.replace(
    /{{([\s\S]+?)}}/g,
    (match: string, key: string) => {
      return String(params[key] === undefined ? "" : params[key])
    }
  )
  return replaced
}

export function pathTemplate(path: string, params: { [key: string]: string }) {
  const replaced = path.replace(/:([\w]+)/g, (match: string, key: string) => {
    return params[key] || ""
  })
  return replaced
}

export function jsxTemplate(
  templateString: string,
  params: { [key: string]: React.ReactNode }
) {
  const output = [] as React.ReactNode[]
  let execArr: RegExpExecArray | null | undefined
  let start = 0
  let count = 0
  const re = /{{([\s\S]+?)}}/g
  while ((execArr = re.exec(templateString)) !== null && count < 100) {
    count++
    if (execArr) {
      output.push(execArr.input.slice(start, execArr.index))
      output.push(params[execArr[1]])
    }
    start = execArr.index + execArr[0].length
  }
  output.push(templateString.slice(start))
  return output
}
