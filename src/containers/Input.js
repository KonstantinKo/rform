import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import { getId, getName } from '../utils/modelParams'
import { optionalTranslation } from '../utils/translations'
import updateAction from '../actions/updateAction'
import Input from '../components/Input'

const mapStateToProps = function(state, ownProps) {
  const formId = ownProps.formId

  let value = ''
  const attrs = state[ownProps.formId]
  if (
    attrs && ownProps.submodel && attrs[ownProps.submodel] &&
    !isNil(attrs[ownProps.submodel][ownProps.attribute])
  ) {
    value = String(attrs[ownProps.submodel][ownProps.attribute])
  } else if (attrs && !isNil(attrs[ownProps.attribute])) {
    value = String(attrs[ownProps.attribute])
  }

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
    name,
    inputId,
    placeholder,
    combinedClassName,
    formState: state[formId],
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,

  onChange(event) {
    dispatchProps.dispatch(
      updateAction(
        ownProps.formId, ownProps.attribute, ownProps.submodel,
        event.target.value
      )
    )

    if (ownProps.submitOnChange) {
      ownProps.onSubmit({ target: ownProps.form })
    }

    if (ownProps.afterChange) ownProps.afterChange(event)
  },

  onBlur(_event) {
    const { attribute, formObjectClass, submodel, formId } = ownProps
    const { formState } = stateProps

    const formObject = new formObjectClass(stateProps.formState)
    formObject.validate(attribute)
    const errorKey = formObject.errorKey(attribute, submodel)
    const errors = formObject.attributes.errors[errorKey]

    if (!errors && (!formState.errors || !formState.errors[errorKey])) return
    dispatchProps.dispatch(updateAction(formId, errorKey, 'errors', errors))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Input)
