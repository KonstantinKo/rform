import React, { PropTypes, Component } from 'react' // import Select from 'react-select'
import Label from '../wrappers/Label'
import Errors from '../wrappers/Errors'
import Input from '../wrappers/Input'
// import DatePicker from 'react-datepicker'
// import moment from 'moment'
// import I18n from 'i18n-js'

export default class InputSet extends Component {
  // static propTypes = {
  //   model: PropTypes.string.isRequired,
  //   attribute: PropTypes.string.isRequired,
  //   // type: PropTypes.string,
  //   // value: PropTypes.oneOfType([
  //   //   PropTypes.string,
  //   //   PropTypes.arrayOf(PropTypes.number),
  //   // ]).isRequired,
  //   // noLabel: PropTypes.bool,
  //   // inlineLabel: PropTypes.bool,
  //   // submodel: PropTypes.string,
  //
  //   id: PropTypes.string.isRequired,
  //   errors: PropTypes.array,
  //   className: PropTypes.string,
  //   combinedWrapperClassName: PropTypes.string.isRequired,
  //   labelText: PropTypes.string.isRequired,
  //   ariaLabelOnly: PropTypes.bool,
  //   labelAfterInput: PropTypes.bool,
  // }

  render() {
    const {
      errors, combinedWrapperClassName, labelAfterInput, labelText, id,
      ariaLabelOnly, attribute, labelClassName, errorClassName
    } = this.props

    if (ariaLabelOnly) {
      return (
        <div className={combinedWrapperClassName}>
          <Input {...this.props} ariaLabel={labelText} />

          <Errors className={errorClassName} attribute={attribute} errors={errors} />
        </div>
      )
    }
    else if (labelAfterInput) {
      return (
        <div className={combinedWrapperClassName}>
          <Input {...this.props} />

          <Label className={labelClassName} attribute={attribute} content={labelText}/>

          <Errors className={errorClassName} attribute={attribute} errors={errors} />
        </div>
      )
    }
    else {
      return (
        <div className={combinedWrapperClassName}>
          <Label className={labelClassName} attribute={attribute} content={labelText}/>

          <Input {...this.props} />

          <Errors className={errorClassName} attribute={attribute} errors={errors} />
        </div>
      )
    }
  }
}
