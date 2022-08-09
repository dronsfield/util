function sumAll(inputs: Array<any>) {
  return inputs.reduce((total, input) => {
    return total + (Number(input) || 0)
  }, 0)
}
export default sumAll
