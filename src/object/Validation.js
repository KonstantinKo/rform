import values from 'lodash/values'
import flatten from 'lodash/flatten'
import Validator from './Validator'
import { errorKey, ERRORCONTAINER } from '../utils/getErrors'

class NonValidator {
  filled() { return true }
}

export default class Validation {
  ALL = 'ALL'

  validate(property = this.ALL) {
    this._resetErrors()
    this.validation()
    return this._validationErrorsIn(property)
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

  _validationErrorsIn(property) {
    const errors = this.attributes[ERRORCONTAINER]
    if (property == this.ALL) {
      return flatten(values(errors)).length && errors
    } else {
      return errors[property] && errors[property].length && errors
    }
  }
}
