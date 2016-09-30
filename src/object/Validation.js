import Validator from './Validator'

class NonValidator {
  filled() { return true }
}

export default class Validation {
  validate(property) {
    this._resetErrors()
    this.validation()
    return(
      !this.attributes.errors[property] ||
      !this.attributes.errors[property].length
    )
  }

  configure(configurations) {
    this._configurations = configurations
  }

  required(property, defaultFilledPredicate = true) {
    return new Validator(
      property, this.attributes, this._currentSubmodel,
      this.errorKey(property, this._currentSubmodel),
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

  errorKey(property, submodel) {
    if (submodel) {
      return `${submodel}.${property}`
    } else {
      return property
    }
  }

  _resetErrors() {
    this.attributes.errors = {}
    this._currentSubmodel = null
  }
}
