import merge from 'lodash/merge'
import forIn from 'lodash/forIn'
import BaseAdapter from './Base'

export default class JsonApiAdapter extends BaseAdapter {
  get requestHash() {
    const data = this._json

    let options = {
      method: this.form._method.value,
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
      }
    }

    if (this.form.authenticity_token)
      options.headers['X-CSRF-TOKEN'] = this.form.authenticity_token.value

    return options
  }

  handleAjaxResponse(json) {
    let changes = {}

    if (json.data) {
      changes[json.data.type] = {}
      changes[json.data.type][json.data.id] =
        merge(json.data.attributes, { id: json.data.id })
    }

    let errors = {}
    if (json.errors) {
      for (let err of json.errors) {
        let erroringAttribute =
          err.source.pointer.replace(/^\/data\/attributes\//, '')
        errors[erroringAttribute] = errors[erroringAttribute] || []
        errors[erroringAttribute].push(err.title)
      }
    }

    return [changes, errors, json.meta]
  }

  // --- Private --- //

  get _json() {
    let jsonObject = { data: { attributes: {} } }
    this._addModelPropsToJson(jsonObject)
    this._addSubmodelPropsToJson(jsonObject)
    return jsonObject
  }

  _addModelPropsToJson(json) {
    const { model, attrs, properties, id } = this

    json.data.type = model + 's' // TODO: Not the best pluralization...
    if (id) json.data.id = String(id)

    for (let property of properties) {
      json.data.attributes[property] = attrs[property]
    }
  }

  // JSONAPI specs don't really talk about create/update of submodels...
  _addSubmodelPropsToJson(json) {
    const { model, submodelConfig, attrs } = this

    if (submodelConfig) {
      json.included = []
      forIn(submodelConfig, (config, submodel) => {
        if (config.type == 'oneToOne') {
          json.included.push(this._createInclusion(
            attrs[submodel], config.properties, submodel
          ))
        } else {
          forIn(attrs[submodel], (subset, index) => {
            json.included.push(this._createInclusion(
              subset, config.properties, submodel
            ))
          })
        }
      })
    }
  }

  _createInclusion(attrs, allowedProperties, submodel) {
    let newElement = { type: submodel, id: null, attributes: {} } // TODO: id for update?
    for (let property of allowedProperties) {
      newElement.attributes[property] = attrs[property]
    }
    return newElement
  }
}
