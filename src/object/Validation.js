import Validator from './Validator'

export default class Validation {
  validate(property) {
    this._resetErrors()
    this.validation()
    return(
      !this.attributes.errors[property] ||
      !this.attributes.errors[property].length
    )
  }

  required(property) {
    return new Validator(
      property, this.attributes, this._currentSubmodel,
      this.errorKey(property, this._currentSubmodel)
    )
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
