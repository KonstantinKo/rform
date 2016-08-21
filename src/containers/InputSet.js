import { connect } from 'react-redux'
import { getId } from '../utils/modelParams'
import getErrors from '../utils/getErrors'
import { optionalTranslation } from '../utils/translations'
import InputSet from '../components/InputSet'

const mapStateToProps = function(state, ownProps) {
  const errors = getErrors(
    state[ownProps.formId], ownProps.attribute, ownProps.errors
  )

  let combinedWrapperClassName =
    `input-${ownProps.attribute} ${ownProps.className}`
  if (errors && errors.length) combinedWrapperClassName += ' has-errors'

  const labelText = ownProps.label ||
    optionalTranslation(ownProps.model, ownProps.submodel, ownProps.attribute, 'label') ||
    ''

  return {
    combinedWrapperClassName,
    labelText,
    id: getId(ownProps.model, ownProps.submodel, ownProps.attribute),
    errors,
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputSet)
