export default class FormObject {
  constructor(initialData = {}) {
    this.attributes = { errors: {} }

    for (let property of this.constructor.properties) {
      this.attributes[property] = null
    }

    const { submodelProperties } = this.constructor
    if (submodelProperties) {
      for (let submodel in submodelProperties) {
        this.attributes[submodel] = {}
        for (let property of submodelProperties[submodel]) {
          this.attributes[submodel][property] = null
        }
      }
    }

    for (let field of Object.keys(initialData)) {
      if (this.constructor.properties.includes(field)) {
        this.attributes[field] = initialData[field]
      }
    }

    if (submodelProperties) {
      for (let submodel in submodelProperties) {
        if (initialData.hasOwnProperty(submodel)) {
          for (let field in initialData[submodel]) {
            if (submodelProperties[submodel].includes(field)) {
              this.attributes[submodel][field] = initialData[submodel][field]
            }
          }
        }
      }
    }
  }

  static get model() {
    throw `FormObject ${this.name} needs to define a model name.`
  }

  static get submodels() {
    return []
  }

  get attributes() {
    return this._attributes
  }
  set attributes(attributes) {
    this._attributes = attributes
  }

  validate(attribute) {
    // TODO: implement!
    if (!this.attributes[attribute]) {
      return {[attribute]: ['must be filled']}
    }
    return {}
  }

  toFormData(form) {
    let formDataObject = new FormData()
    this.addModelPropsToFormData(formDataObject)
    this.addSubmodelPropsToFormData(formDataObject)
    this.addMetaFieldsToFormData(formDataObject, form)
    this.addMethodToFormData(formDataObject, form)
    return formDataObject
  }

  addModelPropsToFormData(formData) {
    const { properties } = this.constructor
    for (let property of properties) {
      this.setFormDataValue(
        formData,
        `${this.constructor.model}[${property}]`,
        this.attributes[property]
      )
    }
  }

  addSubmodelPropsToFormData(formData) {
    const { submodelProperties } = this.constructor
    if (submodelProperties) {
      for (let submodel in submodelProperties) {
        for (let property of submodelProperties[submodel]) {
          this.setFormDataValue(
            formData,
            `${this.constructor.model}[${submodel}][${property}]`,
            this.attributes[submodel][property]
          )
        }
      }
    }
  }

  setFormDataValue(formData, key, value) {
    if (!value) {
      formData.set(key, '')
    }
    else {
      formData.set(key, value)
    }
  }

  addMetaFieldsToFormData(formData, form) {
    const metaFields = [ 'utf8', 'authenticity_token', 'commit' ]
    for (let metaField of metaFields) {
      formData.set(metaField, (form[metaField] && form[metaField].value))
    }
  }

  addMethodToFormData(formData, form) {
    const method = form._method ? form._method.value : 'POST'
    formData.set('_method', method)
  }
}
