import { connect } from 'react-redux'
import FormButton from '../components/FormButton'

const mapStateToProps = (state, ownProps) => {
  let combinedClassName = ownProps.className || ''

  return {
    combinedClassName,

    authToken:
      ownProps.authToken || state.authToken ||
      (state.settings && state.settings.authToken),

    onSubmit: function(event, form) {
      const confirmationMessage = ownProps.confirm

      if (typeof confirmationMessage === 'string') {
        event.preventDefault()

        const result = window.confirm(confirmationMessage)
        if (result) form.submit()
      }
    }
  }
}

const mapDispatchToProps = () => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormButton)
