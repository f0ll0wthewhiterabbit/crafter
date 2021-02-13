// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDataFromStorage = (fieldName: string): any | null => {
  const data = localStorage.getItem(fieldName)

  if (!data) {
    return null
  }

  return JSON.parse(data)
}
