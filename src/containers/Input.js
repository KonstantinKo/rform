import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import { getId, getName } from '../utils/modelParams'
import { optionalTranslation } from '../utils/translations'
import { navigateThroughSubmodels } from '../utils/stateNavigation'
import { ERRORCONTAINER, errorKey } from '../utils/getErrors'
import updateError from '../actions/updateError'
import updateAction from '../actions/updateAction'
import Input from '../components/Input'

const mapStateToProps = function(state, ownProps) {
  const {
    formId, model, attribute, className, disabled,
  } = ownProps

  let submodelPath = ownProps.submodelPath || []

  const rformState = state.rform
  const attrs = rformState[formId]
  const path = navigateThroughSubmodels(attrs, submodelPath)
  let value = ''
  if (path && !isNil(path[attribute])) value = String(path[attribute])

  const savedValue =
    (attrs && attrs._savedAttributes && attrs._savedAttributes[attribute])

  const name = getName(model, attribute, submodelPath)
  const inputId = getId(formId, model, attribute, submodelPath)

  const placeholder = ownProps.placeholder || optionalTranslation(
    'rform', model, ...submodelPath, attribute, 'placeholder'
  )

  const combinedClassName =
    [`input-${attribute}`, className].join(' ')

  return {
    value,
    savedValue,
    name,
    inputId,
    placeholder,
    combinedClassName,
    disabled: (disabled === undefined) ? false : disabled,
    formState: attrs,
    rformState,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const validate = function() {
    const { attribute, formObjectClass, submodelPath, formId } = ownProps
    const { formState, rformState } = stateProps

    const formObject = new formObjectClass(rformState, formId)
    formObject.validate(attribute)
    const errKey = errorKey(attribute, submodelPath)
    const errors = formObject.attributes[ERRORCONTAINER]

    if (!errors && (!formState.errors || !formState.errors[errKey])) return
    dispatchProps.dispatch(updateError(formId, errors, errKey))
  }

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,

    onChange(event) {
      const { formId, attribute, submodelPath } = ownProps
      const { savedValue } = stateProps
      const newValue = event.target.value
      const changed = (newValue != savedValue)

      dispatchProps.dispatch(
        updateAction(
          formId, attribute, submodelPath, newValue, changed
        )
      )

      if (ownProps.submitOnChange) {
        ownProps.onSubmit({ target: ownProps.form })
      }

      if (ownProps.afterChange) ownProps.afterChange(event)
    },

    onBlur(_event) {
      validate()
    },

    validate
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Input)
