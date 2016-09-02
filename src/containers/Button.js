import { connect } from 'react-redux'
import valuesIn from 'lodash/valuesIn'
import assign from 'lodash/assign'
import updateAction from '../actions/updateAction'
import Button from '../components/Button'

const mapStateToProps = (state, ownProps) => {
  return {
    combinedClassName: ['button', ownProps.className].join(' '),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick(_e) {
    const formId = ownProps.formId

    return dispatch(
      updateAction(formId, 'commit', null, ownProps.commit)
    )
  }
})

function allErrors(formAttributes) {
  if (!formAttributes || !formAttributes.errors) return []
  return assign(...valuesIn(formAttributes.errors))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
