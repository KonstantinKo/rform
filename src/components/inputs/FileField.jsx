import React, { PropTypes, Component } from 'react'

export default class FileField extends Component {
  render() {
    const {
      id, name, ariaLabel, labelText, onChange, combinedClassName, disabled,
    } = this.props

    // No value attribute
    return (
      <input
        id={id}
        type='file'
        name={name}
        aria-label={ariaLabel || labelText}
        className={combinedClassName}
        onChange={onChange}
        disabled={disabled}
      />
    )
  }
}
