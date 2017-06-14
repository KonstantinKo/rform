import React, { PropTypes, Component } from 'react'

export default class Select extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType(
          [PropTypes.string, PropTypes.number]
        ).isRequired,
      }).isRequired
    ).isRequired,
  }

  componentDidUpdate() { // TODO: AND inital value != ''
    if (this.props.value === '') this.props.saveInitialValue()
  }

  render() {
    const {
      id, name, value, ariaLabel, labelText, onChange, options,
      combinedClassName, disabled,
    } = this.props

    return (
      <select
        id={id}
        name={name}
        aria-label={ariaLabel || labelText}
        className={combinedClassName}
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          )
        })}
      </select>
    )
  }
}
