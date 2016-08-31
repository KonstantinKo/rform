import Validator from './Validator'

export default class Validation {
  validate(property) {
    this.attributes.errors = {}
    this.validation()
    return !this.attributes.errors[property]
  }

  validates(property) {
    return new Validator(property, this.attributes)
  }
}
