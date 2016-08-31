const submitAjaxFormRequest = function(formId) {
  return {
    type: 'SUBMIT_AJAX_FORM_REQUEST',
    formId
  }
}
const submitAjaxFormFailure = function(error, formId) {
  return {
    type: 'SUBMIT_AJAX_FORM_FAILURE',
    error,
    formId
  }
}
const submitAjaxFormSuccess = (response, formId, ownResultHandling) => ({
  type: 'SUBMIT_AJAX_FORM_SUCCESS',
  response,
  formId,
  ownResultHandling
})
export default function submitAjaxForm(
  formId, url, data, formObject, handleResponse, afterResponse
) {
  return function(dispatch) {
    dispatch(submitAjaxFormRequest(formId))

    //const fetch = require('isomorphic-fetch') // regular import breaks in SSR
    return fetch(url + '.json', {
      method: 'POST', // data.get('_method')
      body: data,
      credentials: 'same-origin'
    }).then(
        function(response) {
          const { status, statusText } = response
          if (status >= 400) {
            dispatch(submitAjaxFormFailure(response, formId))
            throw new Error(`Submit Ajax Form Error ${status}: ${statusText}`)
          }
          return response.json()
        }
      ).then(json => {
        if (handleResponse) handleResponse(json)
        dispatch(submitAjaxFormSuccess(json, formId, !!handleResponse))
        if (afterResponse) afterResponse(json)
      })
  }
}

