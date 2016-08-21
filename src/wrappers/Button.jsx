import React, { Component, PropTypes } from 'react'
import Button from '../containers/Button'

export default class ButtonWrapper extends Component {
  static contextTypes = {
    formObject: PropTypes.object,
  }

  render() {
    return <Button {...this.props} {...this.context} />
  }
}
