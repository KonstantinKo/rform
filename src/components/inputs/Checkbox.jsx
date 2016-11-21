import React, { PropTypes, Component } from 'react'

export default class Checkbox extends Component {
  render() {
    const {
      id, name, ariaLabel, labelText, onChange, combinedClassName,
      checkboxWrapperClassName, checked, checkedValue, uncheckedValue,
      disabled,
    } = this.props

    return (
      <span className={checkboxWrapperClassName}>
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
          disabled={disabled}
        />
      </span>
    )
  }
}
