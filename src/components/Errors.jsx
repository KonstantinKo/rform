import React, { PropTypes, Component } from 'react'

export default class Errors extends Component {
  static propTypes = {
    errors: PropTypes.array,
  }

  render() {
    const { errors } = this.props

    if (errors && errors.length > 0) {
      return (
        <span className='inline-errors'>
          {errors.join(', ')}
        </span>
      )
    } else {
      return null
    }
  }
}

Errors.isRform = true
