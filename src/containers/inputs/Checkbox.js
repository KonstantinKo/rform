import { connect } from 'react-redux'
import updateAction from '../../actions/updateAction'
import Checkbox from '../../components/inputs/Checkbox'

const mapStateToProps = function(state, ownProps) {
  const checkedValue = ownProps.checkedValue || '1'
  const uncheckedValue = ownProps.uncheckedValue || '0'

  let checkboxWrapperClassName
  if (ownProps.value) {
    checkboxWrapperClassName = 'checked'
  }

  return {
    checkedValue,
    uncheckedValue,
    checkboxWrapperClassName,
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
    const { formId, attribute, submodelPath } = ownProps

    dispatchProps.dispatch(
      updateAction(
        formId, attribute, submodelPath, event.target.checked
      )
    )

    if (ownProps.submitOnChange) {
      event.target.form.submit()
    }
  },

  // Save the initial checked/unchecked state
  saveInitialValue() {
    const { formId, attribute, submodelPath } = ownProps

    dispatchProps.dispatch(
      updateAction(formId, attribute, submodelPath, false)
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Checkbox)
