class ServerValidator {

  static NAME_PATTERN = /^([A-ZА-Я]{1,20})$/i
  static EMAIL_PATTERN = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  static PHONE_PATTERN = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  static REG_AUTH_PATTERN =/^([A-Z0-9!#$%&'*+/=?^_`{|}~-]{5,20})$/i
  static CITY_PATTERN = /^([A-ZА-Я]{1}[a-zа-я\s0-9-]{0,19})$/

  static validateStr(str,regexp) {
    return typeof str === 'string' && regexp.test(str)
  }

  static validateNumber(num,func) {
    return typeof num === 'number' && func(num)
  }
}

export { ServerValidator }

