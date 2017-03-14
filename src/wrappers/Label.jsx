import React, { Component, PropTypes } from 'react'
import Label from '../containers/Label'

export default class LabelWrapper extends Component {
  static propTypes = {
    attribute: PropTypes.string.isRequired,
    content: PropTypes.string,
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.array,
  }

  static contextTypes = {
    model: PropTypes.string,
    formId: PropTypes.string,
  }

  render() {
    return <Label {...this.context} {...this.props} />
  }
}
