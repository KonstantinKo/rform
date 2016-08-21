const submitAjaxFormRequest = function(formObjectName) {
  return {
    type: 'SUBMIT_AJAX_FORM_REQUEST',
    formObjectName
  }
}
const submitAjaxFormFailure = function(error, formObjectName) {
  return {
    type: 'SUBMIT_AJAX_FORM_FAILURE',
    error,
    formObjectName
  }
}
const submitAjaxFormSuccess = function(response, formObjectName) {
  return {
    type: 'SUBMIT_AJAX_FORM_SUCCESS',
    response,
    formObjectName
  }
}
export default function submitAjaxForm(url, data, formObject) {
  const formObjectName = formObject.constructor.name

  return function(dispatch) {
    dispatch(submitAjaxFormRequest(formObjectName))

    //const fetch = require('isomorphic-fetch') // regular import breaks in SSR
    return fetch(url + '.json', {
      method: (data.get('_method')),
      body: data,
      credentials: 'same-origin'
    }).then(
        function(response) {
          const { status, statusText } = response
          if (status >= 400) {
            dispatch(submitAjaxFormFailure(response, formObjectName))
            throw new Error(`Submit Ajax Form Error ${status}: ${statusText}`)
          }
          return response.json()
        }
      ).then(json => {
        console.log('json', json)
        dispatch(submitAjaxFormSuccess(json, formObjectName))
      })
  }
}

