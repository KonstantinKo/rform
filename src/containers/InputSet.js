import { connect } from 'react-redux'
import { getId } from '../utils/modelParams'
import getErrors from '../utils/getErrors'
import { optionalTranslation } from '../utils/translations'
import InputSet from '../components/InputSet'

const mapStateToProps = function(state, ownProps) {
  const errors = getErrors(
    state[ownProps.formId], ownProps.attribute, ownProps.submodel,
    ownProps.errors
  )

  let combinedWrapperClassName =
    [`inputset-${ownProps.attribute}`, ownProps.wrapperClassName].join(' ')
  const errorClass = ownProps.wrapperErrorClassName || 'has-errors'
  if (errors && errors.length) combinedWrapperClassName += ' ' + errorClass

  const labelText = ownProps.label || optionalTranslation(
      'rform', ownProps.model, ownProps.submodel, ownProps.attribute, 'label'
    ) || ''

    const id = getId(
      ownProps.formId, ownProps.model, ownProps.submodel, ownProps.attribute
    )

  return {
    combinedWrapperClassName,
    labelText,
    id,
    errors,
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputSet)
