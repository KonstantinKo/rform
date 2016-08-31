import FormDataAdapter from './adapters/FormData'
import Validation from './Validation'
import mixin from '../utils/mixin'

export default class FormObject {
  constructor(initialData = {}) {
    this.id = initialData.id

    const { submodelProperties, properties } = this.constructor
    this.attributes = { errors: {} }

    for (let property of properties) {
      this.attributes[property] = null
    }

    for (let submodel in submodelProperties) {
      this.attributes[submodel] = {}
      for (let property of submodelProperties[submodel]) {
        this.attributes[submodel][property] = null
      }
    }

    for (let field of Object.keys(initialData)) {
      if (properties.includes(field)) {
        this.attributes[field] = initialData[field]
      }
    }

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

  // --- Overwritable --- //

  static get model() {
    throw `FormObject ${this.name} needs to define a model name.`
  }

  static get properties() {
    throw `FormObject ${this.name} needs to define properties.`
  }

  static get submodels() {
    return []
  }

  static get submodelProperties() {
    return {}
  }

  static get ajaxAdapter() {
    return FormDataAdapter
  }

  validation() {
  }

  // --- End Overwritable --- //

  get attributes() {
    return this._attributes
  }
  set attributes(attributes) {
    this._attributes = attributes
  }

  adapter(form) {
    return this._adapter || new this.constructor.ajaxAdapter(form, this)
  }

  requestHash(form) {
    return this.adapter(form).requestHash
  }

  handleAjaxResponse(json) {
    return this.adapter().handleAjaxResponse(json)
  }
}

mixin(FormObject, Validation)
