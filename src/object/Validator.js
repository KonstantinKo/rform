import forIn from 'lodash/forIn'
import uniqBy from 'lodash/uniqBy'
import compact from 'lodash/compact'
import cloneDeep from 'lodash/cloneDeep'
import predicates from './predicates'
import { optionalTranslation } from '../utils/translations'

export default class Validator {
  constructor(property, attrs, submodel, errorKey) {
    this.property = property
    this.attrs = attrs
    this.submodel = submodel
    this.errorKey = errorKey
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
    const predicateCheck = predicates[predicate] && predicates[predicate].check
    if (!predicateCheck) throw new Error(`Unknown predicate "${predicate}"`)

    if (!this._validatable || !predicateCheck(this._validatable, option)) {
      errors.push(this._errorMessage(predicate, option))
    }
  }

  _errorMessage(predicate, option) {
    const translationOptions = predicates[predicate].translationOptions &&
      predicates[predicate].translationOptions(option)

    let translationPath = ['errors', predicate]
    if (predicates[predicate].argType) {
      translationPath.push('arg')
      translationPath.push(predicates[predicate].argType(option))
    }

    console.log(this.property, predicate, translationPath)
    return optionalTranslation(...translationPath, translationOptions)
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

