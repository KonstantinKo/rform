import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import { getId, getName } from '../utils/modelParams'
import { optionalTranslation } from '../utils/translations'
import updateAction from '../actions/updateAction'
import Input from '../components/Input'

const mapStateToProps = function(state, ownProps) {
  const formId = ownProps.formId

  let value = ''
  const attrs = state.rform[ownProps.formId]
  if (
    attrs && ownProps.submodel && attrs[ownProps.submodel] &&
    !isNil(attrs[ownProps.submodel][ownProps.attribute])
  ) {
    value = String(attrs[ownProps.submodel][ownProps.attribute])
  } else if (attrs && !isNil(attrs[ownProps.attribute])) {
    value = String(attrs[ownProps.attribute])
  }

  const savedValue =
    (attrs && attrs._savedAttributes && attrs._savedAttributes[ownProps.attribute])

  const name = getName(ownProps.model, ownProps.submodel, ownProps.attribute)
  const inputId =
    getId(formId, ownProps.model, ownProps.submodel, ownProps.attribute)

  const placeholder = ownProps.placeholder || optionalTranslation(
    'rform', ownProps.model, ownProps.submodel, ownProps.attribute,
    'placeholder'
  )

  const combinedClassName =
    [`input-${ownProps.attribute}`, ownProps.className].join(' ')

  return {
    value,
    savedValue,
    name,
    inputId,
    placeholder,
    combinedClassName,
    disabled: (ownProps.disabled === undefined) ? false : ownProps.disabled,
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

    const formObject = new formObjectClass(stateProps.formState)
    formObject.validate(attribute)
    const errorKey = formObject.errorKey(attribute, submodel)
    const errors = formObject.attributes.errors[errorKey]

    if (!errors && (!formState.errors || !formState.errors[errorKey])) return
    dispatchProps.dispatch(updateAction(formId, errorKey, 'errors', errors))
  }

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,

    onChange(event) {
      const { formId, attribute, submodel } = ownProps
      const { savedValue } = stateProps
      const newValue = event.target.value
      const changed = (newValue != savedValue)

      dispatchProps.dispatch(
        updateAction(formId, attribute, submodel, newValue, changed)
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
