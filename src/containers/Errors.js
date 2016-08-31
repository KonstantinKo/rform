import { connect } from 'react-redux'
import getErrors from '../utils/getErrors'
import Errors from '../components/Errors'

const mapStateToProps = function(state, ownProps) {
  let allErrors = ownProps.errors
  if (!allErrors || !allErrors.length) {
    allErrors = getErrors(
      state[ownProps.formId], ownProps.attribute, ownProps.submodel,
      ownProps.errors
    )
  }

  const combinedClassName = ['inline-errors', ownProps.className].join(' ')

  return {
    allErrors,
    combinedClassName,
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Errors)
