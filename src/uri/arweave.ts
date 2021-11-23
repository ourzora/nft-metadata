import { ARWEAVE_DEFAULT } from "src/constants/providers";
import { isValidHttpUrl } from "./fetch";


export function isArweave(uri: string) {
  const hasPrefix = uri.startsWith('ar://')
  return uri.startsWith('https://arweave.net/') || hasPrefix;
}

export function hasArPrefix(uri: string) {
  return uri.startsWith('ar://')
}

export function getARWeaveURI(uri: string) {
  if (hasArPrefix(uri)) {
    return uri.replace('ar://', ARWEAVE_DEFAULT)
  }
  if (isValidHttpUrl(uri)) {
    return uri;
  }
  throw new Error('Cannot parse ARWeave URI');
}