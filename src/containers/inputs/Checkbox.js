import { connect } from 'react-redux'
import updateAction from '../../actions/updateAction'
import Checkbox from '../../components/inputs/Checkbox'

const mapStateToProps = function(state, ownProps) {
  const checkedValue = ownProps.checkedValue || '1'
  const uncheckedValue = ownProps.checkedValue || '0'
  const checked = ownProps.value

  return {
    checkedValue,
    uncheckedValue,
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
    const { formId, attribute, submodel } = ownProps

    dispatchProps.dispatch(
      updateAction(
        formId, attribute, submodel,
        event.target.checked ? checkedValue : uncheckedValue
      )
    )

    if (ownProps.submitOnChange) {
      event.target.form.submit()
    }
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Checkbox)
