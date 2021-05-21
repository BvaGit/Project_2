class ServerValidator {
  static namePattern = /[A-ZА-Я]{1,20}/i
  static emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  static phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  static regAuthPattern =/[A-ZА-Я0-9]{5,20}/i
  static validateStr(str,regexp) {
    return typeof str === 'string' && regexp.test(str)
  }
  static validateNumber(num,func) {
    
    return typeof num === 'number' && func(num)
  }
}

export { ServerValidator }

