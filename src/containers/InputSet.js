import { connect } from 'react-redux'
import { getId } from '../utils/modelParams'
import getErrors from '../utils/getErrors'
import { optionalTranslation } from '../utils/translations'
import InputSet from '../components/InputSet'

const mapStateToProps = function(state, ownProps) {
  const {
    attribute, submodel, wrapperClassName, wrapperErrorClassName, label,
    formId, model,
  } = ownProps

  const formState = state.rform[formId]
  const errors = getErrors(formState, attribute, submodel, ownProps.errors)

  const changeClass =
    formState && formState._changes.includes(attribute) ? 'changed' : 'saved'

  let combinedWrapperClassName =
    [`inputset-${attribute}`, wrapperClassName, changeClass]
    .join(' ')
  const errorClass = wrapperErrorClassName || 'has-errors'
  if (errors && errors.length) combinedWrapperClassName += ' ' + errorClass

  const labelText = label || optionalTranslation(
      'rform', model, submodel, attribute, 'label'
    ) || ''

    const id = getId(
      formId, model, submodel, attribute
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
