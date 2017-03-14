import FormDataAdapter from './adapters/FormData'
import Validation from './Validation'
import mixin from '../utils/mixin'

export default class FormObject {
  constructor(initialData = {}) {
    this.id = initialData.id

    const { submodels, submodelConfig, properties } = this.constructor
    this.attributes = { errors: {} }

    for (let property of properties) {
      this.attributes[property] = null
    }

    for (let submodel of submodels) {
      this.attributes[submodel] = {}
      let config = this._submodelConfig(submodel)
      if (config.type == 'oneToOne') {
        for (let property of config.properties) {
          this.attributes[submodel][property] = null
        }
      }
    }

    for (let field of Object.keys(initialData)) {
      if (properties.includes(field)) {
        this.attributes[field] = initialData[field]
      }
    }

    for (let submodel of submodels) {
      let config = this._submodelConfig(submodel)

      if (initialData.hasOwnProperty(submodel)) {
        for (let fieldOrIndex in initialData[submodel]) {
          if (fieldOrIndex.match(/^\d+$/)) { // is index, consists of number(s)
            this.attributes[submodel][fieldOrIndex] = {}
            for (let field in initialData[submodel][fieldOrIndex]) {
              if (config.properties.includes(field)) {
                this.attributes[submodel][fieldOrIndex][field] =
                  initialData[submodel][fieldOrIndex][field]
              }
            }
          } else if (config.includes(fieldOrIndex)) {
            this.attributes[submodel][fieldOrIndex] =
              initialData[submodel][fieldOrIndex]
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

  static get submodelConfig() {
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

  _submodelConfig(submodel) {
    const config = this.constructor.submodelConfig &&
      this.constructor.submodelConfig[submodel]
    if (!config) throw new Error(`No configs given for submodel "${submodel}"`)
    return config
  }
}

mixin(FormObject, Validation)
