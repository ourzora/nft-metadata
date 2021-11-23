
export function createDataURI(mime: string, data: string) {
  const dataBuffer = Buffer.from(data, 'utf-8')
  return `${mime};base64,${dataBuffer.toString('base64')}`
}
