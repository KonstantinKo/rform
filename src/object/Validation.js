import Validator from './Validator'
import { errorKey, ERRORCONTAINER } from '../utils/getErrors'

class NonValidator {
  filled() { return true }
}

export default class Validation {
  validate(property) {
    this._resetErrors()
    this.validation()
    return(
      !this.attributes[ERRORCONTAINER][property] ||
      !this.attributes[ERRORCONTAINER][property].length
    )
  }

  configure(configurations) {
    this._configurations = configurations
  }

  required(property, defaultFilledPredicate = true) {
    return new Validator(
      property, this.attributes, this._currentSubmodel,
      errorKey(property, [this._currentSubmodel]), // !
      defaultFilledPredicate,
      this._configurations,
    )
  }

  maybe(property, options = {}) {
    if (
      options.if !== false ||
      (options.if === undefined && this.attributes[property])
    ) {
      return this.required(property, false)
    } else {
      return new NonValidator()
    }
  }

  inSubmodel(submodel, callback) {
    this._currentSubmodel = submodel
    callback.bind(this)()
  }

  _resetErrors() {
    this.attributes[this.ERRORCONTAINER] = {}
    this._currentSubmodel = null
  }
}
