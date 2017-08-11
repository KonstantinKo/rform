const submitAjaxFormButtonRequest = function(url, method) {
  return {
    type: '_RFORM_SUBMIT_AJAX_FORM_BUTTON_REQUEST',
    url,
    method,
  }
}

const submitAjaxFormButtonReturn = function(url, method) {
  return {
    type: '_RFORM_SUBMIT_AJAX_FORM_BUTTON_RETURN',
    url,
    method,
  }
}

export default function submitAjaxFormButton(
  adapter, url, method, afterSuccess, afterError
) {
  return function(dispatch) {
    dispatch(submitAjaxFormButtonRequest(url, method))

    return fetch(url, adapter.requestHash)
      .then((response) => {
        const { status, statusText } = response
        dispatch(submitAjaxFormButtonReturn(url, method))
        if (status >= 400) {
          console.error(
            `Submit Ajax Form Button Error ${status}: ${statusText}`
          )
          afterError && afterError(response)
        } else {
          afterSuccess && afterSuccess(response)
        }
      }
    )
  }
}
