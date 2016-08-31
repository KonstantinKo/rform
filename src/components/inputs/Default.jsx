import React, { PropTypes, Component } from 'react'

export default class Default extends Component {
  render() {
    const {
      inputId, type, name, value, placeholder, ariaLabel, labelText, onChange,
      onBlur, combinedClassName, min, max,
    } = this.props

    return (
      <input
        id={inputId}
        type={type || 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel || labelText}
        className={combinedClassName}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
      />
    )
  }
}
