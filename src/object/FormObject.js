import FormDataAdapter from './adapters/FormData'
import Validation from './Validation'
import mixin from '../utils/mixin'
import { ERRORCONTAINER } from '../utils/getErrors'

export default class FormObject {

  constructor(rformData, formId) {
    this.formId = formId
    this.rformData = rformData

    const initialData = rformData[formId] || {}
    this.id = initialData.id

    const { submodels, submodelConfig, properties } = this.constructor
    this.attributes = {}
    this.attributes[ERRORCONTAINER] = {}

    for (let property of properties) {
      this.attributes[property] = null
    }

    // initialize empty submodel properties
    for (let initialSubmodel of submodels) {
      this.attributes[initialSubmodel] = []
      // let initialConfig = this._submodelConfig(initialSubmodel)
      // if (initialConfig.relationship == 'oneToOne') {
      //   for (let property of initialConfig.properties) {
      //     this.attributes[initialSubmodel][property] = null
      //   }
      // }
    }

    // transfer own properties
    for (let field of Object.keys(initialData)) {
      if (properties.includes(field)) {
        this.attributes[field] = initialData[field]
      }
    }

    // transfer submodel properties
    for (let submodel of submodels) {
      let config = this.constructor._submodelConfig(submodel)

      const submodelDataSets =
        this._collectSubmodelDataSets(submodel, rformData, initialData, config)
      this.attributes[submodel] = submodelDataSets

      // for (let fieldOrIndex of initialData[submodel]) { // each submodel prop
      //   if (fieldOrIndex.match(/^\d+$/)) { // is index, consists of number(s)
      //     this.attributes[submodel][fieldOrIndex] = {}
      //     for (let field in initialData[submodel][fieldOrIndex]) {
      //       if (config.properties.includes(field)) {
      //         this.attributes[submodel][fieldOrIndex][field] =
      //           initialData[submodel][fieldOrIndex][field]
      //       }
      //     }
      //   } else if (config.properties.includes(fieldOrIndex)) { // is non-number
      //     this.attributes[submodel][fieldOrIndex] =
      //       initialData[submodel][fieldOrIndex]
      //   }
      // }
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

  static _submodelConfig(submodel) {
    const config = this.submodelConfig && this.submodelConfig[submodel]
    if (!config) throw new Error(`No configs given for submodel "${submodel}"`)
    if (config.object) {
      config.properties = config.object.properties
      config.type = config.object.type
      config.submodels = config.object.submodels
      config.submodelConfigs = config.object.collectedSubmodelConfigs
    }
    return config
  }

  static get collectedSubmodelConfigs() {
    let configs = {}
    for (let submodel of this.submodels)
      configs[submodel] = this._submodelConfig(submodel)
    return configs
  }

  _collectSubmodelDataSets(submodel, rformData, initialData, config) {
    let dataSets = []

    if (
      initialData._registeredSubmodelForms &&
        initialData._registeredSubmodelForms[submodel]
    ) {
      // form uses external form as submodel form
      for (let subFormId of initialData._registeredSubmodelForms[submodel]) {
        dataSets.push(new config.object(rformData, subFormId).attributes)
      }
    }

    if (initialData.hasOwnProperty(submodel)) {
      // form has internal nested submodels
      dataSets.push(...initialData[submodel])
    }
    return dataSets
  }
}

mixin(FormObject, Validation)
