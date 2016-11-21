import React, { PropTypes, Component } from 'react'

export default class Textarea extends Component {
  render() {
    const {
      id, name, value, placeholder, ariaLabel, labelText, onChange,
      combinedClassName, disabled,
    } = this.props

    return (
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel || labelText}
        className={combinedClassName}
        onChange={onChange}
        disabled={disabled}
      />
    )
  }
}
