import { connect } from 'react-redux'
import { getId } from '../utils/modelParams'
import { optionalTranslation } from '../utils/translations'
import InputSet from '../components/InputSet'

const mapStateToProps = function(state, ownProps) {
  let combinedWrapperClassName =
    `input-${ownProps.attribute} ${ownProps.className}`
  if (ownProps.errors && ownProps.errors.length > 0) { // ?
    combinedWrapperClassName += ' has-errors'
  }

  const labelText = ownProps.label ||
    optionalTranslation(ownProps.model, ownProps.submodel, ownProps.attribute, 'label') ||
    ''

  return {
    combinedWrapperClassName,
    labelText,
    id: getId(ownProps.model, ownProps.submodel, ownProps.attribute),
  }
}

const mapDispatchToProps = dispatch => ({})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputSet)

export default connected
