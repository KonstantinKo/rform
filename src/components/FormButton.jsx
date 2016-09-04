import React, { PropTypes, Component } from 'react'
// import ChildComponent from '../../Base/components/ChildComponent'

export default class FormButton extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    authToken: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  render() {
    const {
      action, method, authToken, children, onSubmit, combinedClassName
    } = this.props

    return(
      <form action={action} method='POST' ref={ref => this._form = ref}>
        <input type='hidden' name='authenticity_token' value={authToken} />
        <input type='hidden' name='_method' value={method} />
        <button
          className={combinedClassName} type='submit'
          onClick={event => onSubmit(event, this._form)}
        >
          {children}
        </button>
      </form>
    )
  }
}
