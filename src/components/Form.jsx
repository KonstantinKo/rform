import React, { PropTypes, Component } from 'react'
// import ChildComponent from '../../Base/components/ChildComponent'

// A general form helper in the general style of rails' #form_for
//
// Renders the form tag with general hidden fields like auth token. Also sets
// up it's children with information about the outer form.
export default class Form extends Component {
  static propTypes = {
    formObjectClass: PropTypes.func,
    formObject: PropTypes.object.isRequired,
    seedData: PropTypes.object,
    existingAttrs: PropTypes.object.isRequired,
    ensureStateObjectExistence: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    authToken: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    errors: PropTypes.object,
    method: PropTypes.string,
    className: PropTypes.string,
    formId: PropTypes.string.isRequired,
    enctype: PropTypes.string.isRequired,
    combinedClassName: PropTypes.string.isRequired,
    formMethod: PropTypes.string.isRequired,
    hiddenMethod: PropTypes.string.isRequired,
  }

  static childContextTypes = {
    formObject: PropTypes.object,
    model: PropTypes.string,
    // serverErrors: PropTypes.array,
    formId: PropTypes.string,
  }

  getChildContext() {
    return {
      formObject: this.props.formObject,
      model: this.props.model,
      // serverErrors: this.props.errors,
      formId: this.props.formId,
    }
  }

  componentDidMount() {
    this.props.ensureStateObjectExistence()
    if (this.props.immediateSubmit) this.props.onSubmit({ target: this._form })
  }

  render() {
    const {
      onSubmit, children, multipart, className, commit, formId,
      action, authToken, method, enctype, combinedClassName, formMethod,
      hiddenMethod
    } = this.props

    return(
      <form
        className={combinedClassName} action={action} method={formMethod}
        onSubmit={onSubmit} encType={enctype} id={formId}
        ref={element => this._form = element}
      >
        <input type='hidden' name='utf8' value='&#x2713;' />
        {this.optionalHiddenField('authenticity_token', authToken)}
        {this.optionalHiddenField('commit', commit)}
        <input type='hidden' name='_method' value={hiddenMethod} />

        {children}
      </form>
    )
  }

  optionalHiddenField(name, hiddenValue) {
    if (hiddenValue) {
      return <input type='hidden' name={name} value={hiddenValue} />
    }
  }
}
