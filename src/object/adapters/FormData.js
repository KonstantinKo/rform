import forIn from 'lodash/forIn'
import BaseAdapter from './Base'

export default class FormDataAdapter extends BaseAdapter {
  get requestHash() {
    const data = this._formData

    return {
      method: data.get('_method'),
      body: data,
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-CSRF-TOKEN': data.get('authenticity_token')
      }
    }
  }

  handleAjaxResponse(json) {
    const meta = json.meta

    switch (json.status) {
    case 'success':
      let responseChanges = {}
      forIn(json.changes, (changedInstance, changedList) => {
        responseChanges[changedList] = responseChanges[changedList] || {}
        responseChanges[changedList][changedInstance.id] = changedInstance
      })
      return [responseChanges, null, meta]
    case 'formErrors':
      return [null, json.errors, meta]
    default:
      throw `Unknown json.status "${json.status}"`
    }
  }

  // --- Private --- //

  get _formData() {
    let formDataObject = new FormData()
    this._addModelPropsToFormData(formDataObject)
    this._addSubmodelPropsToFormData(formDataObject)
    this._addMetaFieldsToFormData(formDataObject)
    this._addMethodToFormData(formDataObject)
    return formDataObject
  }

  _addModelPropsToFormData(formData) {
    const { model, attrs, properties } = this

    for (let property of properties) {
      this._setFormDataValue(
        formData, `${model}[${property}]`, attrs[property]
      )
    }
  }

  _addSubmodelPropsToFormData(formData) {
    const { model, submodelProperties, attrs } = this

    if (submodelProperties) {
      for (let submodel in submodelProperties) {
        for (let property of submodelProperties[submodel]) {
          this._setFormDataValue(
            formData,
            `${model}[${submodel}][${property}]`,
            attrs[submodel][property]
          )
        }
      }
    }
  }

  _setFormDataValue(formData, key, value) {
    if (!value) {
      formData.set(key, '')
    }
    else {
      formData.set(key, value)
    }
  }

  _addMetaFieldsToFormData(formData) {
    const form = this.form
    const metaFields = [ 'utf8', 'authenticity_token', 'commit' ]

    for (let metaField of metaFields) {
      formData.set(metaField, (form[metaField] && form[metaField].value))
    }
  }

  _addMethodToFormData(formData) {
    const form = this.form
    const method = form._method ? form._method.value : 'POST'

    formData.set('_method', method)
  }
}
