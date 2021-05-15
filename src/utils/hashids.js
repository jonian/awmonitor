import { encodeURL, decode } from 'js-base64'

export const hashids = {
  encode: data => encodeURL(JSON.stringify(data)),
  decode: data => JSON.parse(decode(data))
}
