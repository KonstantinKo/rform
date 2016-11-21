import assign from 'lodash/assign'
import merge from 'lodash/merge'
import pickBy from 'lodash/pickBy'

const INTERNAL_KEYS = ['_savedAttributes', '_changes', 'errors']

export const initialState = {
  isSubmitting: {}
}

export default function reducer(state = initialState, action) {
  const { type } = action
  let newState = assign({}, state)

  switch (type) {
  case 'SET_FORM':
    newState[action.formId] = merge(
      action.formData, { _savedAttributes: action.formData, _changes: [] }
    )
    return newState

  case 'SET_FORM_SAVED':
    newState[action.formId] = merge(
      state[action.formId], {
        _savedAttributes: pickBy(state[action.formId], (value, key) =>
          !INTERNAL_KEYS.includes(key)
        ),
      }
    )
    newState[action.formId]._changes = []
    return newState

  case 'UPDATE_FORM_ATTRIBUTE':
    let formBasePath = newState[action.formId]
    if (action.submodel) {
      if (!formBasePath[action.submodel]) formBasePath[action.submodel] = {}
      formBasePath[action.submodel][action.attribute] = action.value
    } else {
      formBasePath[action.attribute] = action.value
    }

    if (action.changed === true && !formBasePath._changes.includes(action.attribute))
      formBasePath._changes.push(action.attribute)
    if (action.changed === false && formBasePath._changes.includes(action.attribute))
      formBasePath._changes.pop(action.attribute)

    return newState

  case 'SUBMIT_AJAX_FORM_REQUEST':
    newState.isSubmitting[action.formId] = true
    return newState

  case 'SUBMIT_AJAX_FORM_RETURN':
    newState.isSubmitting[action.formId] = false
    return newState

  case 'HANDLE_AJAX_RESPONSE':
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

