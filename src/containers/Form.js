import { connect } from 'react-redux'
import merge from 'lodash/merge'
import { cloneElement, Children } from 'react'

import { setEntity } from '../actions/entityActions'
import submitAjaxForm from '../actions/submitAjaxForm'
import Form from '../components/Form'

const mapStateToProps = (state, ownProps) => {
  const formId = ownProps.id || ownProps.formObjectClass.name
  const editedStateObject = state[formId]

  const enctype = ownProps.multipart
    ? 'multipart/form-data'
    : 'application/x-www-form-urlencoded'

  let formMethod = ownProps.method || 'POST'
  let hiddenMethod
  if (['GET', 'POST'].indexOf(formMethod) < 0) {
    hiddenMethod = formMethod
    formMethod = 'POST'
  }

  const authToken = ownProps.authToken || state.authToken
  const formObject = new ownProps.formObjectClass(editedStateObject)

  return {
    existingAttrs: assembleAttrsFromServer(
      ownProps.seedData, ownProps.formObjectClass
    ),
    formObject,
    editedStateObject,
    formId,
    commit: (editedStateObject && editedStateObject.commit),
    enctype,
    formMethod,
    hiddenMethod,
    authToken,
    combinedClassName: `rform-form ${ownProps.className}`,
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
    event.preventDefault()

    const { dispatch } = dispatchProps
    const { formObject } = stateProps
    const data = formObject.toFormData(event.nativeEvent.target)

    dispatch(submitAjaxForm(ownProps.action, data, formObject))

    return false
  },

  ensureStateObjectExistence() {
    if (stateProps.editedStateObject) return
    return dispatchProps.dispatch(
      setEntity(stateProps.formId, stateProps.existingAttrs)
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Form)
