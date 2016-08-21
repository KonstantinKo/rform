import { connect } from 'react-redux'
import FormButton from '../components/FormButton'

const mapStateToProps = (state) => ({
  authToken: state.authToken,
})

const mapDispatchToProps = () => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormButton)
