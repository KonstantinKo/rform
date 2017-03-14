import React, { Component, PropTypes } from 'react'
import InputSet from '../containers/InputSet'

export default class InputSetWrapper extends Component {
  static contextTypes = {
    model: PropTypes.string,
    formId: PropTypes.string,
  }

  render() {
    return <InputSet {...this.context} {...this.props} />
  }
}
