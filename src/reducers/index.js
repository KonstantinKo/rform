import assign from 'lodash/assign'
import merge from 'lodash/merge'
import pickBy from 'lodash/pickBy'
import { navigateThroughSubmodels } from '../utils/stateNavigation'

const INTERNAL_KEYS = ['_savedAttributes', '_changes', 'errors']

export const initialState = {
  isSubmitting: {}
}

export default function reducer(state = initialState, action) {
  const { type } = action
  let newState = assign({}, state)

  switch (type) {
  case '_RFORM_SET_FORM':
    newState[action.formId] = merge(
      action.formData, { _savedAttributes: action.formData, _changes: [] }
    )
    return newState

  case '_RFORM_SET_FORM_SAVED':
    newState[action.formId] = merge(
      state[action.formId], {
        _savedAttributes: pickBy(state[action.formId], (value, key) =>
          !INTERNAL_KEYS.includes(key)
        ),
      }
    )
    newState[action.formId]._changes = []
    return newState

  case '_RFORM_UPDATE_FORM_ATTRIBUTE':
    const { attribute, formId, submodel, submodelIndex, changed } = action
    let formBasePath = newState[formId]
    const submodelBasePath =
      navigateThroughSubmodels(formBasePath, submodel, submodelIndex, true)
    submodelBasePath[action.attribute] = action.value

    const changesBasePath = navigateThroughSubmodels(
      formBasePath._changes, submodel, submodelIndex, true, [])
    if (changed === true && !changesBasePath.includes(attribute))
      changesBasePath.push(attribute)
    if (changed === false && changesBasePath.includes(attribute))
      changesBasePath.pop(attribute)

    return newState

  case '_RFORM_SUBMIT_AJAX_FORM_REQUEST':
    newState.isSubmitting[action.formId] = true
    return newState

  case '_RFORM_SUBMIT_AJAX_FORM_RETURN':
    newState.isSubmitting[action.formId] = false
    return newState

  case '_RFORM_HANDLE_AJAX_RESPONSE':
    let responseChanges = {}
    if (action.errors) {
      responseChanges[action.formId] = state[action.formId]
      responseChanges[action.formId].errors = action.errors
    }

    newState = merge(newState, responseChanges)
    return newState

  default:
    return newState
  }
}

