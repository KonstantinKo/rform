import { connect } from 'react-redux'
import merge from 'lodash/merge'
import { cloneElement, Children } from 'react'

import setForm from '../actions/setupAction'
import submitAjaxForm from '../actions/submitAjaxForm'
import defaultFormObject from '../utils/defaultFormObject'
import Form from '../components/Form'

const mapStateToProps = (state, ownProps) => {
  const formObjectClass =
    ownProps.formObjectClass ||
    defaultFormObject(ownProps.model, ownProps.children)
  const formId = ownProps.id || formObjectClass.name
  const editedStateObject = state[formId]

  const enctype = ownProps.multipart
    ? 'multipart/form-data'
    : 'application/x-www-form-urlencoded'

  let formMethod = ownProps.method || 'POST'
  let hiddenMethod = formMethod
  if (['GET', 'POST'].indexOf(formMethod) < 0) { // is non-standard method
    formMethod = 'POST'
  }

  const authToken = ownProps.authToken || state.authToken
  const model = ownProps.model || formObjectClass.model
  const formObject = new formObjectClass(editedStateObject)

  return {
    existingAttrs: assembleAttrsFromServer(
      ownProps.seedData, formObjectClass
    ),
    formObject,
    editedStateObject,
    formId,
    commit: (editedStateObject && editedStateObject.commit),
    enctype,
    formMethod,
    hiddenMethod,
    authToken,
    combinedClassName: ['rform-form', ownProps.className].join(' '),
    model,
  }
}

// the values we want from the server provided serialized object are nested
// under `fields`. The same is true for included submodels.
function assembleAttrsFromServer(seedData, rformObject) {
  // Early return when there was no serialized object provided by the server
  if (!seedData) { return {} }

  // Otherwise assemble main and submodels' fields
  let attrs = merge({}, seedData.fields)
  for (let submodel of rformObject.submodels) {
    if (seedData.fields[submodel]) {
      attrs[submodel] = seedData.fields[submodel].fields
    }
  }
  return attrs
}

const mapDispatchToProps = (dispatch) => ({
  onBlur() {
    // TODO: validationAction not yet defined
    // return dispatch(validationAction(field))
  },

  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,

  onSubmit(event) {
    if (!ownProps.ajax) { return true }
    if (event.preventDefault) event.preventDefault()

    const { dispatch } = dispatchProps
    const { formObject, formId } = stateProps
    const { handleResponse, afterResponse } = ownProps
    const data = formObject.toFormData(event.target)

    dispatch(
      submitAjaxForm(
        formId, ownProps.action, data, formObject, handleResponse,
        afterResponse
      )
    )
    return false
  },

  ensureStateObjectExistence() {
    if (stateProps.editedStateObject) return
    return dispatchProps.dispatch(
      setForm(stateProps.formId, stateProps.existingAttrs)
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Form)
