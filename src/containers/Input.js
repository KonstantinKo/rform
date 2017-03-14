import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import { getId, getName } from '../utils/modelParams'
import { optionalTranslation } from '../utils/translations'
import { navigateThroughSubmodels } from '../utils/stateNavigation'
import updateAction from '../actions/updateAction'
import Input from '../components/Input'

const mapStateToProps = function(state, ownProps) {
  const {
    formId, model, submodel, submodelIndex, attribute, className, disabled,
  } = ownProps

  const attrs = state.rform[formId]
  const path =
    navigateThroughSubmodels(attrs, submodel, submodelIndex)
  let value = ''
  if (path && !isNil(path[attribute])) value = String(path[attribute])

  const savedValue =
    (attrs && attrs._savedAttributes && attrs._savedAttributes[attribute])

  const name = getName(model, submodel, attribute, !!submodelIndex)
  const inputId = getId(formId, model, submodel, attribute, submodelIndex)

  const placeholder = ownProps.placeholder || optionalTranslation(
    'rform', model, submodel, attribute, 'placeholder'
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
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const validate = function() {
    const { attribute, formObjectClass, submodel, formId } = ownProps
    const { formState } = stateProps

    const formObject = new formObjectClass(formState)
    formObject.validate(attribute)
    const errorKey = formObject.errorKey(attribute, submodel)
    const errors = formObject.attributes.errors[errorKey]

    if (!errors && (!formState.errors || !formState.errors[errorKey])) return
    dispatchProps.dispatch(updateAction(formId, errorKey, 'errors', null, errors))
  }

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,

    onChange(event) {
      const { formId, attribute, submodel, submodelIndex } = ownProps
      const { savedValue } = stateProps
      const newValue = event.target.value
      const changed = (newValue != savedValue)

      dispatchProps.dispatch(
        updateAction(
          formId, attribute, submodel, submodelIndex, newValue, changed
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
