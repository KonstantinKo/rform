import { connect } from 'react-redux'
import concat from 'lodash/concat'
import compact from 'lodash/compact'

import { getId, getName } from '../utils/modelParams'
import { optionalTranslation } from '../utils/translations'
import updateAction from '../actions/updateAction'
import Input from '../components/Input'

const mapStateToProps = function(state, ownProps) {
  const formId = ownProps.formId

  // get saved & server provided errors, concat them together
  let errors = null
  // if (ownProps.errors) {
  if (state[formId] && state[formId].errors) {
    errors = state[formId].errors[ownProps.attribute] || []
  }
  // errors = compact(concat(errors, ownProps.serverErrors))


  let value = ''
  const attrs = ownProps.formObject.attributes
  if (ownProps.submodel && attrs[ownProps.submodel]) {
    value = attrs[ownProps.submodel][ownProps.attribute] || ''
  } else {
    value = attrs[ownProps.attribute] || ''
  }

  // const modelParamName = this._modelParamName(model, submodel)
  // const modelParamId = this._modelParamId(model, submodel)
  //
  // const submodelKey = submodel ? `.${submodel}` : ''
  //
  // const id = `${modelParamId}_${attribute}`
  const name = getName(ownProps.model, ownProps.submodel, ownProps.attribute)
  // const label = I18n.t(
  //   `react_form.${model}${submodelKey}.${attribute}.label`
  // )
  const placeholder = ownProps.placeholder || optionalTranslation(
    ownProps.model, ownProps.submodel, ownProps.attribute, 'placeholder'
  )

  // const dateFormat = I18n.t('react_form.date_format')
  //
  // let ariaLabel, placeholderOrLabel = placeholder
  // if (inlineLabel) {
  //   ariaLabel = label
  //   placeholderOrLabel = label
  // }

  return {
    errors,
    value,
    name,
    id: getId(ownProps.model, ownProps.submodel, ownProps.attribute),
    placeholder,
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
    return dispatchProps.dispatch(
      updateAction(
        ownProps.formId, ownProps.attribute, ownProps.submodel,
        event.target.value
      )
    )
  }

  // onBlur(attribute, formObject) {
  //   const errors = formObject.validate(attribute)
  //   if (!errors) return
  //   dispatch(updateAction('NewPledgeForm', 'errors', errors))
  // }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Input)
