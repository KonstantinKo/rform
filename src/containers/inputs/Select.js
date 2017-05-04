import { connect } from 'react-redux'
import updateAction from '../../actions/updateAction'
import Select from '../../components/inputs/Select'

const mapStateToProps = function(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,

  // Since a select always has some value pre-selected, theat value should be
  // saved to the state
  saveInitialValue() {
    const {
      formId, attribute, submodel, submodelIndex, value, options
    } = ownProps
    const initialValue = value || (options[0] && options[0].value)

    dispatchProps.dispatch(
      updateAction(formId, attribute, submodel, submodelIndex, initialValue)
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Select)
