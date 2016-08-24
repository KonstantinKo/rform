import { connect } from 'react-redux'
import { getId, getName } from '../utils/modelParams'
import { optionalTranslation } from '../utils/translations'
import updateAction from '../actions/updateAction'
import Input from '../components/Input'

const mapStateToProps = function(state, ownProps) {
  const formId = ownProps.formId

  let value = ''
  const attrs = ownProps.formObject.attributes
  if (ownProps.submodel && attrs[ownProps.submodel]) {
    value = attrs[ownProps.submodel][ownProps.attribute] || ''
  } else {
    value = attrs[ownProps.attribute] || ''
  }

  const name = getName(ownProps.model, ownProps.submodel, ownProps.attribute)

  const placeholder = ownProps.placeholder || optionalTranslation(
    ownProps.model, ownProps.submodel, ownProps.attribute, 'placeholder'
  )

  const combinedClassName = `input-${ownProps.attribute} ${ownProps.className}`

  // let ariaLabel, placeholderOrLabel = placeholder
  // if (inlineLabel) {
  //   ariaLabel = label
  //   placeholderOrLabel = label
  // }

  return {
    value,
    name,
    id: getId(ownProps.model, ownProps.submodel, ownProps.attribute),
    placeholder,
    combinedClassName,
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
      event.target.form.submit()
    }
  }

  // onBlur(attribute, formObject) {
  //   const errors = formObject.validate(attribute)
  //   if (!errors) return
  //   dispatch(updateAction('NewPledgeForm', 'errors', errors))
  // }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Input)
