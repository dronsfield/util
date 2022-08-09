export async function addNestedData<
  IdKey extends string,
  DataKey extends string,
  DataType extends any,
  Item extends { [IK in IdKey]?: string | null }
>(
  items: Array<Item>,
  options: {
    idKey: IdKey
    dataKey: DataKey
    getDataFn: (item: Item) => Promise<DataType | null>
  }
) {
  const allData: { [id: string]: DataType | null } = {}
  await Promise.all(
    items.map((item) => {
      return (async () => {
        const dataId = item[options.idKey] as string | null
        if (dataId) {
          const itemData = await options.getDataFn(item)
          allData[dataId] = itemData
        }
      })()
    })
  )
  return items.map((item) => {
    const dataId = item[options.idKey] as string | null
    const itemData = dataId && allData[dataId] ? allData[dataId] : null
    return { ...item, [options.dataKey]: itemData } as Item &
      { [DK in DataKey]: DataType }
  })
}
