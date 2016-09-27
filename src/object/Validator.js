import forIn from 'lodash/forIn'
import uniqBy from 'lodash/uniqBy'
import compact from 'lodash/compact'
import cloneDeep from 'lodash/cloneDeep'
import predicates from './predicates'
import { optionalTranslation } from '../utils/translations'

export default class Validator {
  constructor(property, attrs, submodel, errorKey, configurations = {}) {
    this.property = property
    this.attrs = attrs
    this.submodel = submodel
    this.errorKey = errorKey
    this.configurations = configurations
  }

  // Require presence with optional additions
  filled(...chosenPredicates) {
    chosenPredicates.unshift('filled?')
    let errors = []

    for (let predicate of chosenPredicates) {
      if (typeof predicate === 'object') {
        let optionPredicates = predicate
        forIn(predicate, (option, predicateWithOption) =>
          this._checkPredicate(errors, predicateWithOption, option)
        )
      } else {
        this._checkPredicate(errors, predicate)
      }
    }

    this._errors = uniqBy(compact(errors))
  }

  _checkPredicate(errors, predicate, option = null) {
    let predicateCheck = this._predicate(predicate)
    if (typeof predicateCheck == 'object') predicateCheck = predicateCheck.check
    if (!predicateCheck) throw new Error(`Unknown predicate "${predicate}"`)

    if (!this._validatable || !predicateCheck(this._validatable, option)) {
      errors.push(this._errorMessage(predicate, option))
    }
  }

  _errorMessage(predicate, option) {
    const translationOptions =
      this._predicate(predicate).translationOptions &&
      this._predicate(predicate).translationOptions(option)

    let translationPath = ['errors', predicate]
    if (this._predicate(predicate).argType) {
      translationPath.push('arg')
      translationPath.push(this._predicate(predicate).argType(option))
    }

    return optionalTranslation(...translationPath, translationOptions)
  }

  _predicate(predicate) {
    return predicates[predicate] || this.configurations[predicate]
  }

  get _validatable() {
    if (this.submodel) {
      return this.attrs[this.submodel][this.property]
    } else {
      return this.attrs[this.property]
    }
  }

  set _errors(errors) {
    this.attrs.errors[this.errorKey] = errors
  }
}

