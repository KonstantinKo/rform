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
    const formObjectName = ownProps.formObject.constructor.name

    return dispatch(
      updateAction(formObjectName, 'commit', null, ownProps.commit)
    )
  }
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
connected.isButton = true

export default connected
