import Validator from './Validator'

class NonValidator {
  filled() { return true }
}

export default class Validation {
  validate(property) {
    this._resetErrors()
    this.validation()
    if (property == 'image') console.log('erras', this.attributes.errors)
    return(
      !this.attributes.errors[property] ||
      !this.attributes.errors[property].length
    )
  }

  configure(configurations) {
    this._configurations = configurations
  }

  required(property) {
    return new Validator(
      property, this.attributes, this._currentSubmodel,
      this.errorKey(property, this._currentSubmodel),
      this._configurations
    )
  }

  maybe(property, options = {}) {
    if (this.attributes[property] && options.if !== false) {
      return this.required(property)
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
