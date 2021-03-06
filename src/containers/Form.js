import { connect } from 'react-redux'
import merge from 'lodash/merge'
import forIn from 'lodash/forIn'
import { cloneElement, Children } from 'react'

import setForm from '../actions/setupAction'
import updateForm from '../actions/updateAction'
import submitAjaxForm from '../actions/submitAjaxForm'
import defaultFormObject from '../utils/defaultFormObject'
import { validateForm } from '../utils/validate'
import updateError from '../actions/updateError'
import { ERRORCONTAINER } from '../components/Form'
import Form from '../components/Form'

const mapStateToProps = (state, ownProps) => {
  const formObjectClass =
    ownProps.formObjectClass ||
    defaultFormObject(ownProps.model, ownProps.children)
  const formId = ownProps.id || formObjectClass.name
  const editedStateObject = state.rform[formId]
  const rformState = state.rform

  const enctype = ownProps.multipart
    ? 'multipart/form-data'
    : 'application/x-www-form-urlencoded'

  let formMethod = ownProps.method || 'POST'
  let hiddenMethod = formMethod
  if (['GET', 'POST'].indexOf(formMethod) < 0) { // is non-standard method
    formMethod = 'POST'
  }

  const authToken =
    ownProps.authToken || state.authToken ||
    (state.settings && state.settings.authToken)
  const model = ownProps.model || formObjectClass.model

  return {
    existingAttrs: assembleAttrsFromServer(
      ownProps.seedData, formObjectClass
    ),
    editedStateObject,
    rformState,
    formId,
    commit: (editedStateObject && editedStateObject.commit),
    enctype,
    formMethod,
    hiddenMethod,
    authToken,
    combinedClassName: ['rform-form', ownProps.className].join(' '),
    model,
    formObjectClass,
  }
}

// the values we want from the server-provided serialized object are nested
// under `fields`. The same is true for included submodels.
function assembleAttrsFromServer(seedData, formObjectClass) {
  // Early return when there was no serialized object provided by the server
  if (!seedData) { return {} }

  // Otherwise assemble main and submodels' fields
  let attrs = merge({}, seedData.fields, seedData.errors)
  // TODO: reenable this, but consider there might be ids/ id arrays in there
  // for (let submodel of formObjectClass.submodels) {
  //   if (seedData.fields[submodel]) {
  //     let submodelData = seedData.fields[submodel]
  //     attrs[submodel] = merge({}, submodelData.fields, submodelData.errors)
  //   }
  // }
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
  ...ownProps,
  ...stateProps,
  ...dispatchProps,

  onSubmit(event) {
    if (!ownProps.ajax) return true
    if (event.preventDefault) event.preventDefault()

    const { dispatch } = dispatchProps
    const { formObjectClass, formId, rformState } = stateProps
    const {
      afterResponse, afterRequireValid, beforeSubmit, afterError
    } = ownProps

    const formObject = new formObjectClass(rformState, formId)
    if (ownProps.requireValid) {
      let result = validateForm(formObject)
      if (afterRequireValid) afterRequireValid(result)
      if (!result.valid) {
        forIn(result.errors, (errors, erroringFormId) =>
          dispatch(updateError(erroringFormId, errors))
        )
        return false
      }
    }

    if (beforeSubmit) beforeSubmit()

    dispatch(
      submitAjaxForm(
        formId, ownProps.action, event.target, formObject, afterResponse,
        afterError
      )
    )
    return false
  },

  ensureStateObjectExistence() {
    if (stateProps.editedStateObject) return
    //  if there is no state object yet, create one
    dispatchProps.dispatch(
      setForm(stateProps.formId, stateProps.existingAttrs)
    )

    // call initial data setting callback
    ownProps.formStateDidMount &&
      ownProps.formStateDidMount(stateProps.formId, stateProps.existingAttrs)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Form)
