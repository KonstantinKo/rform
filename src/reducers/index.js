import assign from 'lodash/assign'
import merge from 'lodash/merge'
import pickBy from 'lodash/pickBy'
import remove from 'lodash/remove'
import forIn from 'lodash/forIn'
import { ERRORCONTAINER } from '../utils/getErrors'
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
    const { attribute, formId, submodelPath, changed } = action
    let formBasePath = newState[formId]
    const submodelBasePath =
      navigateThroughSubmodels(formBasePath, submodelPath, true)
    submodelBasePath[action.attribute] = action.value

    const changesBasePath = navigateThroughSubmodels(
      formBasePath._changes, submodelPath, true, [])
    if (changed === true && !changesBasePath.includes(attribute))
      changesBasePath.push(attribute)
    if (changed === false && changesBasePath.includes(attribute))
      changesBasePath.pop(attribute)

    return newState

  case '_RFORM_UPDATE_ERROR':
    let errors = action.formObject.attributes[ERRORCONTAINER]
    if (action.onlyKey) {
      newState[action.formId][ERRORCONTAINER] =
        newState[action.formId][ERRORCONTAINER] || {}
      newState[action.formId][ERRORCONTAINER][action.onlyKey] =
        errors[action.onlyKey]
    } else {
      newState[action.formId][ERRORCONTAINER] = errors
    }
    return newState

  case '_RFORM_SUBMIT_AJAX_FORM_REQUEST':
    newState.isSubmitting[action.formId] = true
    return newState

  case '_RFORM_SUBMIT_AJAX_FORM_RETURN':
    newState.isSubmitting[action.formId] = false
    return newState

  case '_RFORM_HANDLE_AJAX_RESPONSE':
    let responseChanges = {}
    if (action.formErrorHash) {
      forIn(action.formErrorHash, (errors, formId) => {
        responseChanges[formId] = state[formId]
        responseChanges[formId].errors = errors
      })
    }

    newState = merge(newState, responseChanges)
    return newState

  case '_RFORM_REGISTER_SUBMODEL_FORM':
    const { registeringFormId, submodelName, registeredSubmodelFormId } = action
    newState[registeringFormId]._registeredSubmodelForms =
      newState[registeringFormId]._registeredSubmodelForms || {}
    newState[registeringFormId]._registeredSubmodelForms[submodelName] =
      newState[registeringFormId]._registeredSubmodelForms[submodelName] || []

    newState[registeringFormId]._registeredSubmodelForms[submodelName].push(
      registeredSubmodelFormId
    )
    return newState

  case '_RFORM_UNREGISTER_SUBMODEL_FORM':
    remove(
      newState[action.unregisteringFormId]
        ._registeredSubmodelForms[action.submodelName],
      (element) => element == action.unregisteredSubmodelFormId
    )
    return newState

  default:
    return newState
  }
}

