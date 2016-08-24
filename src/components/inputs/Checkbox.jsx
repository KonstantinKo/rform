import React, { PropTypes, Component } from 'react'

export default class Checkbox extends Component {
  render() {
    const {
      id, name, ariaLabel, labelText, onChange, checkboxWrapperClassName,
      combinedClassName, checked, checkedValue, uncheckedValue,
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
          className={combinedClassName}
          aria-label={ariaLabel || labelText}
          onChange={onChange}
          value={checkedValue}
        />
      </span>
    )
  }
}
