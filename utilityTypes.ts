// useful for when you want to pass object?.property
// directly into a function when it might not exist
export type Maybe<T> = T | null | undefined

// eg:
// ValueOf<{ a: X, b: Y, c: Z }>
// -> X | Y | Z
export type ValueOf<T> = T[keyof T]

export type ItemsOf<A extends Readonly<string[]>> = A[number]

// useful for formatters
export interface ValuesAndLabels<Values> {
  values: Values
  labels: { [key in keyof Values]: string }
}

//https://stackoverflow.com/questions/59774572/how-to-get-the-return-type-of-async-function-in-typescript
export type AsyncReturnType<
  T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any
