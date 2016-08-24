import React, { PropTypes, Component } from 'react'

export default class Checkbox extends Component {
  render() {
    const {
      id, name, ariaLabel, labelText, onChange, evenMoreCombinedClassName,
      checked, checkedValue, uncheckedValue,
    } = this.props

    // No value attribute
    return (
      <span className={evenMoreCombinedClassName}>
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
          onChange={onChange}
          value={checkedValue}
        />
      </span>
    )
  }
}
