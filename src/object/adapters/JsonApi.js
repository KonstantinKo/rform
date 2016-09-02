import merge from 'lodash/merge'
import BaseAdapter from './Base'

export default class JsonApiAdapter extends BaseAdapter {
  get requestHash() {
    const data = this._json

    return {
      method: this.form._method.value,
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        'X-CSRF-TOKEN': this.form.authenticity_token.value
      }
    }
  }

  handleAjaxResponse(json) {
    let changes = {}

    if (json.data) {
      changes[json.data.type] = {}
      changes[json.data.type][json.data.id] =
        merge(json.data.attributes, { id: json.data.id })
    }

    return [changes, json.errors, json.meta]
  }

  // --- Private --- //

  get _json() {
    let jsonObject = { data: { attributes: {} } }
    this._addModelPropsToJson(jsonObject)
    // this._addSubmodelPropsToJson(jsonObject)
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

  // TODO: Implement. Specs don't really talk about create/upd. of submodels...
  // _addSubmodelPropsToJson(json) {
  //   const { model, submodelProperties, attrs } = this
  //
  //   if (submodelProperties) {
  //     for (let submodel in submodelProperties) {
  //       for (let property of submodelProperties[submodel]) {
  //         let path = json.data.relationships[submodel]
  //         path = path || { data: { type: submodel, id: null, attributes: {} } }
  //         path.data.attributes = attrs[submodel][property]
  //       }
  //     }
  //   }
  // }
}
