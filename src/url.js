import messages from './messages'
import Validators from './index'
import { regFormat } from './helpers'

const REG_URL = /^(?:(?:(?:https?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

// Uses "format" internally which is already memoized
let url = function (options) {
  options = Object.assign({}, options)
  let reg = REG_URL
  let protocols = options.protocols || options.protocol || Validators.defaultOptions.urlProtocols
  if (protocols) {
    protocols = [].concat(protocols).join('|')
    if (protocols !== 'http|https') {
      reg = new RegExp(REG_URL.source.replace('https?', protocols), REG_URL.flags)
    }
  }
  return regFormat(options, reg, messages.url)
}

url.REG_URL = REG_URL

export default url
