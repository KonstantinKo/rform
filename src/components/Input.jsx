import React, { PropTypes, Component } from 'react'
import Default from './inputs/Default'
import FileField from './inputs/FileField'
import Textarea from './inputs/Textarea'
import Select from './inputs/Select'
import Checkbox from '../containers/inputs/Checkbox'

export default class Input extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired,
    // formObject: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      // PropTypes.arrayOf(PropTypes.number),
    ]).isRequired,
    placeholder: PropTypes.string,
    ariaLabel: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  }

  render() {
    const { type } = this.props

    switch (type) {
    case 'textarea':
      return <Textarea {...this.props} />

    case 'file':
      return <FileField {...this.props} />

    case 'checkbox':
      return <Checkbox {...this.props} />

    case 'select':
    case 'dropdown':
      return <Select {...this.props} />

    default:
      return <Default {...this.props} />
    }
  }
}
