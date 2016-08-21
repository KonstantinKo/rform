import React, { PropTypes, Component } from 'react'
// import ChildComponent from '../../Base/components/ChildComponent'

export default class FormButton extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    authToken: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  render() {
    const { action, method, authToken, children, className } = this.props

    let combinedClassName
    if (className) {
      combinedClassName = className
    }

    return(
      <form action={action} method='POST'>
        <input type='hidden' name='authenticity_token' value={authToken} />
        <input type='hidden' name='_method' value={method} />
        <button className={combinedClassName} type='submit'>{children}</button>
      </form>
    )
  }
}
