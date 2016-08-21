import React, { Component, PropTypes } from 'react'
import Errors from '../containers/Errors'

export default class ErrorsWrapper extends Component {
  static propTypes = {
    errors: PropTypes.array.isRequired,
    attribute: PropTypes.string.isRequired,
  }

  static contextTypes = {
    formId: PropTypes.string,
  }

  render() {
    return <Errors {...this.props} {...this.context} />
  }
}
