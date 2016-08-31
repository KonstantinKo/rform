import React, { PropTypes, Component } from 'react'

export default class Errors extends Component {
  static propTypes = {
    allErrors: PropTypes.array.isRequired,
  }

  render() {
    const {
      allErrors, combinedClassName,
    } = this.props

    if (allErrors && allErrors.length) {
      return (
        <span className={combinedClassName}>
          {allErrors.join(', ')}
        </span>
      )
    } else {
      return null
    }
  }
}
