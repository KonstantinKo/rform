import { connect } from 'react-redux'
import values from 'lodash/values'
import assign from 'lodash/assign'
import updateAction from '../actions/updateAction'
import Button from '../components/Button'

const mapStateToProps = (state, ownProps) => {
  const {
    children, formId, className, disableOnInvalid, disableOnUnchanged,
    invalidDisabledLabel, unchangedDisabledLabel
  } = ownProps
  const formState = state.rform[formId]

  let renderedLabel = ownProps.label || children
  let disabled = disabled || false

  if (formState) {
    if (!disabled && disableOnInvalid && allErrors(formState).length) {
      disabled = true
      renderedLabel = invalidDisabledLabel || renderedLabel
    }

    if (!disabled && disableOnUnchanged && !formState._changes.length) {
      disabled = true
      renderedLabel = unchangedDisabledLabel || renderedLabel
    }
  }

  return {
    renderedLabel,
    disabled,
    combinedClassName: ['button', className].join(' '),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick(_e) {
    const formId = ownProps.formId
    dispatch(
      updateAction(formId, 'commit', [], ownProps.commit)
    )
    return true
  }
})

function allErrors(formAttributes) {
  if (!formAttributes || !formAttributes.errors) return []
  return assign(...values(formAttributes.errors))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
