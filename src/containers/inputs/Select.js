import { connect } from 'react-redux'
import updateAction from '../../actions/updateAction'
import { navigateThroughSubmodels } from '../../utils/stateNavigation'
import Select from '../../components/inputs/Select'

const mapStateToProps = function(state, ownProps) {
  const path = navigateThroughSubmodels(
    state.rform[ownProps.formId], ownProps.submodelPath || []
  )
  const value = path && path[ownProps.attribute]

  return { value }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,

  // Since a select always has some value pre-selected, theat value should be
  // saved to the state
  saveInitialValue() {
    const { formId, attribute, submodelPath, value, options } = ownProps
    const initialValue = value || (options[0] && options[0].value)

    dispatchProps.dispatch(
      updateAction(formId, attribute, submodelPath, initialValue)
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Select)
