import { connect } from 'react-redux'
import updateAction from '../../actions/updateAction'
import Checkbox from '../../components/inputs/Checkbox'

const mapStateToProps = function(state, ownProps) {
  const checkedValue = ownProps.checkedValue || '1'
  const uncheckedValue = ownProps.uncheckedValue || '0'
  const value = ownProps.value

  let checkboxWrapperClassName
  let checked = false
  if (value === checkedValue) {
    checked = true
    checkboxWrapperClassName = 'checked'
  }

  return {
    checked,
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
    const { checkedValue, uncheckedValue } = stateProps
    const { formId, attribute, submodelPath } = ownProps

    dispatchProps.dispatch(
      updateAction(
        formId, attribute, submodelPath,
        event.target.checked ? checkedValue : uncheckedValue
      )
    )

    if (ownProps.submitOnChange) {
      event.target.form.submit()
    }
  },

  // Save the initial checked/unchecked state
  saveInitialValue() {
    const {
      formId, attribute, submodelPath, value
    } = ownProps

    dispatchProps.dispatch(
      updateAction(
        formId, attribute, submodelPath, value || stateProps.uncheckedValue
      )
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Checkbox)
