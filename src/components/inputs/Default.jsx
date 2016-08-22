import React, { PropTypes, Component } from 'react'

export default class Default extends Component {
  render() {
    const {
      id, type, name, value, placeholder, ariaLabel, labelText, onChange,
      combinedClassName,
    } = this.props

    return (
      <input
        id={id}
        type={type || 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel || labelText}
        className={combinedClassName}
        onChange={onChange}
      />
    )
  }
}
