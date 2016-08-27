import { connect } from 'react-redux'
import updateAction from '../actions/updateAction'
import Button from '../components/Button'

const mapStateToProps = (state, ownProps) => {
  return {
    combinedClassName: ['button', ownProps.className].join(' ')
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
