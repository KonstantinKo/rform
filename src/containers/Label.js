import { connect } from 'react-redux'
import { getId } from '../utils/modelParams'
import { optionalTranslation } from '../utils/translations'
import Label from '../components/Label'

const mapStateToProps = function(state, ownProps) {
  return {
    htmlFor:
      ownProps.htmlFor ||
      getId(ownProps.model, ownProps.submodel, ownProps.attribute),
    content: ownProps.content || ownProps.children ||
      optionalTranslation(ownProps.model, ownProps.submodel, ownProps.attribute, 'label') ||
      ''
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Label)
