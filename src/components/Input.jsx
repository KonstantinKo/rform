import React, { PropTypes, Component } from 'react'

export default class Input extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired,
    formObject: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      // PropTypes.arrayOf(PropTypes.number),
    ]).isRequired,
    errors: PropTypes.array,
    placeholder: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  }

  render() {
    const {
      model, attribute, type, submodel, errors, object, value,
      noLabel, inlineLabel, className, formId, id, placeholder,
      labelText, ariaLabel, onChange, name
    } = this.props

    switch (type) {
    case 'textarea':
      return (
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          aria-label={ariaLabel || labelText}
          onChange={onChange}
        />
      )

    case 'file': // no value
      return(
        <input
          id={id}
          type={'file'}
          name={name}
          aria-label={ariaLabel || labelText}
          onChange={onChange}
        />
      )

    default:
      return(
        <input
          id={id}
          type={type || 'text'}
          name={name}
          value={value}
          placeholder={placeholder}
          aria-label={ariaLabel || labelText}
          onChange={onChange}
        />
      )
    }
  }
}
