import assign from 'lodash/assign'
import merge from 'lodash/merge'

export const initialState = {
  isSubmitting: {}
}

export default function reducer(state = initialAjaxSubmissionState, action) {
  const { type } = action
  let newState = assign({}, state)

  switch (type) {
  case 'SET_FORM':
    newState[action.formId] = action.formData
    return newState

  case 'UPDATE_FORM_ATTRIBUTE':
    let formBasePath = newState[action.formId]
    if (action.submodel) {
      if (!formBasePath[action.submodel]) formBasePath[action.submodel] = {}
      formBasePath[action.submodel][action.attribute] = action.value
    } else {
      formBasePath[action.attribute] = action.value
    }
    return newState

  case 'SUBMIT_AJAX_FORM_REQUEST':
    newState.isSubmitting[action.formId] = true
    return newState

  case 'SUBMIT_AJAX_FORM_RETURN':
    newState.isSubmitting[action.formId] = false
    return newState

  case 'HANDLE_AJAX_RESPONSE':
    let responseChanges = {}
    if (action.changes) {
      responseChanges = action.changes
    } else if (action.errors) {
      responseChanges[action.formId] = state[action.formId]
      responseChanges[action.formId].errors = action.errors
    }

    newState = merge(newState, responseChanges)
    return newState

  default:
    return newState
  }
}

