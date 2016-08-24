import React, { PropTypes, Component } from 'react'

export default class Checkbox extends Component {
  render() {
    const {
      id, name, ariaLabel, labelText, onChange, combinedClassName,
      checked, checkedValue, uncheckedValue,
    } = this.props

    // No value attribute
    return (
      <span className={checked === checkedValue ? 'checked' : ''}>
        <input
          type='hidden'
          name={name}
          value={uncheckedValue}
        />
        <input
          id={id}
          type='checkbox'
          name={name}
          aria-label={ariaLabel || labelText}
          className={combinedClassName}
          onChange={onChange}
          value={checkedValue}
        />
      </span>
    )
  }
}
