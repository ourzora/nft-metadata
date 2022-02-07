import isIPFS from 'is-ipfs'

/* 
  From https://github.com/PinataCloud/ipfs-gateway-tools/blob/master/src/index.js
  Package was broken on minor version that was not published to github.
  Moving code to utility file and cleaning up usage/syntax.
*/

export function getCID(url: string) {
  if (typeof url !== 'string') {
    throw new Error('url is not string')
  }
  const splitUrl = url.split('/')
  for (const split of splitUrl) {
    if (isIPFS.cid(split)) {
      return split
    }
    const splitOnDot = split.split('.')[0]
    if (isIPFS.cid(splitOnDot)) {
      return splitOnDot
    }
  }

  return null
}

export const convertToDesiredGateway = (
  sourceUrl: string,
  desiredGatewayPrefix: string,
) => {
  const cid = getCID(sourceUrl)
  if (!cid) {
    throw new Error('url does not contain CID')
  }

  if (isIPFS.cid(cid)) {
    return `${desiredGatewayPrefix}/ipfs/${cid}`
  }

  const splitUrl = sourceUrl.split(cid)

  // Case 1 - the ipfs://cid path
  if (sourceUrl.includes(`ipfs://${cid}`)) {
    return `${desiredGatewayPrefix}/ipfs/${cid}${splitUrl[1]}`
  }

  // Case 2 - the /ipfs/cid path (this should cover ipfs://ipfs/cid as well
  if (sourceUrl.includes(`/ipfs/${cid}`)) {
    return `${desiredGatewayPrefix}/ipfs/${cid}${splitUrl[1]}`
  }

  // Case 3 - the /ipns/cid path
  if (sourceUrl.includes(`/ipns/${cid}`)) {
    return `${desiredGatewayPrefix}/ipns/${cid}${splitUrl[1]}`
  }

  // This is the fallback if no supported patterns are provided
  throw new Error('Unsupported IPFS URL pattern')
}
