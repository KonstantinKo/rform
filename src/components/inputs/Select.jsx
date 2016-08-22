import React, { PropTypes, Component } from 'react'

export default class Select extends Component {
  render() {
    const {
      id, name, value, ariaLabel, labelText, onChange, options,
      combinedClassName,
    } = this.props

    return (
      <select
        id={id}
        name={name}
        aria-label={ariaLabel || labelText}
        className={combinedClassName}
        onChange={onChange}
        value={value}
      >
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          )
        })}
      </select>
    )
  }
}
