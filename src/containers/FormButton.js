import { connect } from 'react-redux'
import submitAjaxFormButton from '../actions/submitAjaxFormButton'
import FormButton from '../components/FormButton'

const mapStateToProps = (state, ownProps) => {
  let combinedClassName = ownProps.className || ''

  return {
    combinedClassName,

    authToken:
      ownProps.authToken || state.authToken ||
      (state.settings && state.settings.authToken),

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const submit = (form) => {
    const {
      ajax, action, method, afterSuccess, afterError, adapter
    } = ownProps

    if (ajax) {
      dispatch(submitAjaxFormButton(
        new adapter(form), action, method, afterSuccess, afterError
      ))
    } else {
      form.submit()
    }
  }

  return {
    onSubmit(event, form) {
      event.preventDefault()

      const confirmationMessage = ownProps.confirm

      if (typeof confirmationMessage === 'string') {
        if (window.confirm(confirmationMessage)) submit(form)
      } else {
        submit(form)
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormButton)
