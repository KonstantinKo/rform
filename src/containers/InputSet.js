import { connect } from 'react-redux'
import { getId } from '../utils/modelParams'
import getErrors from '../utils/getErrors'
import { navigateThroughSubmodels } from '../utils/stateNavigation'
import { optionalTranslation } from '../utils/translations'
import InputSet from '../components/InputSet'

const mapStateToProps = function(state, ownProps) {
  const {
    attribute, submodel, wrapperClassName, wrapperErrorClassName, label,
    formId, model, submodelIndex,
  } = ownProps

  const formState = state.rform[formId]
  const errors = getErrors(formState, attribute, submodel, ownProps.errors)

  let changeList = formState && navigateThroughSubmodels(
    formState._changes, submodel, submodelIndex
  )
  const changeClass =
    (changeList && changeList.includes(attribute)) ? 'changed' : 'saved'

  let combinedWrapperClassName =
    [`inputset-${attribute}`, wrapperClassName, changeClass]
    .join(' ')
  const errorClass = wrapperErrorClassName || 'has-errors'
  if (errors && errors.length) combinedWrapperClassName += ' ' + errorClass

  const labelText = label || optionalTranslation(
    'rform', model, submodel, attribute, 'label'
  ) || ''

  return {
    combinedWrapperClassName,
    labelText,
    errors,
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputSet)
