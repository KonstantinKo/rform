const submitAjaxFormRequest = function(formId) {
  return {
    type: 'SUBMIT_AJAX_FORM_REQUEST',
    formId
  }
}
const submitAjaxFormReturn = function(formId) {
  return {
    type: 'SUBMIT_AJAX_FORM_RETURN',
    formId
  }
}
const handleAjaxResponse = (formId, changes, errors, meta) => ({
  type: 'HANDLE_AJAX_RESPONSE',
  formId,
  changes,
  errors,
  meta
})
export default function submitAjaxForm(
  formId, url, form, formObject, handleResponse, afterResponse
) {
  return function(dispatch) {
    dispatch(submitAjaxFormRequest(formId))

    //const fetch = require('isomorphic-fetch') // regular import breaks in SSR
    return fetch(
      url,
      formObject.requestHash(form)
    ).then(
      function(response) {
        const { status, statusText } = response
        dispatch(submitAjaxFormReturn(formId))
        if (status >= 400) {
          throw new Error(`Submit Ajax Form Error ${status}: ${statusText}`)
        }
        return response.json()
      }
    ).then(json => {
      if (handleResponse) {
        handleResponse(json)
      } else {
        dispatch(
          handleAjaxResponse(formId, ...formObject.handleAjaxResponse(json))
        )
      }

      if (afterResponse) afterResponse(json)
    })
  }
}

