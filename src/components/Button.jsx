import React, { PropTypes, Component } from 'react'

export default class Input extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    commit: PropTypes.string,
    className: PropTypes.string,
    combinedClassName: PropTypes.string.isRequired,
  }

  render() {
    const {
      combinedClassName, onClick, formId, renderedLabel, disabled
    } = this.props


    return (
      <button
        form={formId} className={combinedClassName} onClick={onClick}
        type='submit' disabled={disabled}
      >
        {renderedLabel}
      </button>
    )
  }
}
