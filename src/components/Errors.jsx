import React, { PropTypes, Component } from 'react'

export default class Errors extends Component {
  static propTypes = {
    allErrors: PropTypes.array.isRequired,
  }

  render() {
    const { allErrors } = this.props

    if (allErrors && allErrors.length) {
      return (
        <span className='inline-errors'>
          {allErrors.join(', ')}
        </span>
      )
    } else {
      return null
    }
  }
}
