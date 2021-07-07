export const universalBtoa = (str: string) => {
  try {
    return btoa(str)
  } catch (err) {
    return Buffer.from(str).toString('base64')
  }
}

export const universalAtob = (b64Encoded: string) => {
  try {
    return atob(b64Encoded)
  } catch (err) {
    return Buffer.from(b64Encoded, 'base64').toString()
  }
}
