import assign from 'lodash/assign'
import forIn from 'lodash/forIn'

export const initialState = {
  isSubmitting: {}
}

export default function reducer(state = initialAjaxSubmissionState, action) {
  const { type, response } = action
  let newState = assign({}, state)

  switch (type) {
  case 'SET_FORM':
    newState[action.formId] = action.formData
    return newState

  case 'UPDATE_FORM_ATTRIBUTE':
    const formBasePath = newState[action.formId]
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

  case 'SUBMIT_AJAX_FORM_FAILURE':
    newState.isSubmitting[action.formId] = false
    return newState

  case 'SUBMIT_AJAX_FORM_SUCCESS':
    if (!action.ownResultHandling) {
      let responseChanges = {}
      switch (response.status) {
      case 'success':
        forIn(response.changes, (changedInstance, changedList) => {
          responseChanges[changedList] = state[changedList] || {}
          responseChanges[changedList][changedInstance.id] = changedInstance
        })
        break
      case 'formErrors':
        responseChanges[action.formId] = state[action.formId]
        responseChanges[action.formId].errors = response.errors
        break
      default:
        throw `Unknown response.status "${response.status}"`
      }

      newState = assign(newState, responseChanges)
    }
    newState.isSubmitting[action.formId] = false
    return newState

  default:
    return newState
  }
}

