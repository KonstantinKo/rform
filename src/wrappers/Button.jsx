import React, { Component, PropTypes } from 'react'
import Button from '../containers/Button'

export default class ButtonWrapper extends Component {
  static contextTypes = {
    formId: PropTypes.string,
  }

  render() {
    return <Button {...this.context} {...this.props} />
  }
}
