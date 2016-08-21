import React, { PropTypes, Component } from 'react'

export default class Label extends Component {
  static propTypes = {
    htmlFor: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }

  render() {
    const { className, htmlFor, content } = this.props

    return (
      <label className={className} htmlFor={htmlFor}>
        {content}
      </label>
    )
  }
}
