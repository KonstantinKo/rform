import React, { Component, PropTypes } from 'react'
import Input from '../containers/Input'

export default class InputWrapper extends Component {
  static propTypes = {
    attribute: PropTypes.string.isRequired,
    type: PropTypes.string,
    submodel: PropTypes.string,
    className: PropTypes.string,
  }

  static contextTypes = {
    model: PropTypes.string,
    formId: PropTypes.string,
    form: PropTypes.object,
    onSubmit: PropTypes.func,
    formObjectClass: PropTypes.func,
  }

  render() {
    return <Input {...this.props} {...this.context} />
  }
}
