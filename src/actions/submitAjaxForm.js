import setFormSaved from './setFormSaved'

const submitAjaxFormRequest = function(formId) {
  return {
    type: '_RFORM_SUBMIT_AJAX_FORM_REQUEST',
    formId
  }
}

const submitAjaxFormReturn = function(formId) {
  return {
    type: '_RFORM_SUBMIT_AJAX_FORM_RETURN',
    formId
  }
}

const handleAjaxResponse = (_changes, formErrorHash, _meta) => ({
  type: '_RFORM_HANDLE_AJAX_RESPONSE',
  formErrorHash,
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
          console.error(`Submit Ajax Form Error ${status}: ${statusText}`)
        }
        return response.json()
      }
    ).then(json => {
      const evaluatedResponseContents = formObject.handleAjaxResponse(json)
      if (handleResponse) {
        // TODO: Do we still need both handleResponse AND afterResponse?
        handleResponse(formId, ...evaluatedResponseContents, json)
      }

      dispatch(
        handleAjaxResponse(...evaluatedResponseContents)
      )

      const responseErrors = evaluatedResponseContents[1]
      if (!responseErrors) dispatch(setFormSaved(formId))

      if (afterResponse) afterResponse(json)
    })
  }
}

