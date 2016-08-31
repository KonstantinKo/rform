import { connect } from 'react-redux'
import { getId, getName } from '../utils/modelParams'
import { optionalTranslation } from '../utils/translations'
import updateAction, { updateErrors } from '../actions/updateAction'
import Input from '../components/Input'

const mapStateToProps = function(state, ownProps) {
  const formId = ownProps.formId

  let value = ''
  const attrs = state[ownProps.formId]
  if (attrs && ownProps.submodel && attrs[ownProps.submodel]) {
    value = attrs[ownProps.submodel][ownProps.attribute] || ''
  } else if (attrs) {
    value = attrs[ownProps.attribute] || ''
  }

  const name = getName(ownProps.model, ownProps.submodel, ownProps.attribute)
  const inputId =
    getId(formId, ownProps.model, ownProps.submodel, ownProps.attribute)

  const placeholder = ownProps.placeholder || optionalTranslation(
    ownProps.model, ownProps.submodel, ownProps.attribute, 'placeholder'
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
  },

  onBlur(event) {
    const { attribute, formObjectClass, submodel, formId } = ownProps
    const { formState } = stateProps

    const formObject = new formObjectClass(stateProps.formState)
    formObject.validate(attribute)
    const errors = formObject.attributes.errors[attribute]

    if (!errors && (!formState.errors || !formState.errors[attribute])) return
    dispatchProps.dispatch(updateErrors(formId, attribute, submodel, errors))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Input)
