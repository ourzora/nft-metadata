const isIPFS = require('is-ipfs')

/* 
From https://github.com/PinataCloud/ipfs-gateway-tools/blob/master/src/index.js
Package was broken on minor upgrade, so moving code to utility file and making typescript.
*/

export function containsCID(url: string) {
  if (typeof url !== 'string') {
    throw new Error('url is not string')
  }
  const splitUrl = url.split('/')
  for (const split of splitUrl) {
    if (isIPFS.cid(split)) {
      return {
        containsCid: true,
        cid: split,
      }
    }
    const splitOnDot = split.split('.')[0]
    if (isIPFS.cid(splitOnDot)) {
      return {
        containsCid: true,
        cid: splitOnDot,
      }
    }
  }

  return {
    containsCid: false,
    cid: null,
  }
}


export const convertToDesiredGateway = (sourceUrl: string, desiredGatewayPrefix: string) => {
  const results = containsCID(sourceUrl);    
  if (results.containsCid !== true || !results.cid) {
    throw new Error("url does not contain CID");
  }

  if(isIPFS.cid(results.cid)) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}`
  }

  const splitUrl = sourceUrl.split(results.cid);

  // Case 1 - the ipfs://cid path
  if (sourceUrl.includes(`ipfs://${results.cid}`)) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}${splitUrl[1]}`;
  }

  // Case 2 - the /ipfs/cid path (this should cover ipfs://ipfs/cid as well
  if (sourceUrl.includes(`/ipfs/${results.cid}`)) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}${splitUrl[1]}`;
  }

  // Case 3 - the /ipns/cid path
  if (sourceUrl.includes(`/ipns/${results.cid}`)) {
    return `${desiredGatewayPrefix}/ipns/${results.cid}${splitUrl[1]}`;
  }

  // This is the fallback if no supported patterns are provided
  throw new Error(
    "Unsupported IPFS URL pattern"
  );
};