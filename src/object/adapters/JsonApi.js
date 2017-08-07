import merge from 'lodash/merge'
import forIn from 'lodash/forIn'
import BaseAdapter from './Base'

export default class JsonApiAdapter extends BaseAdapter {
  get requestHash() {
    const data = this.renderedJson

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
      changes = this._changeElementFromJsonapiObject(json.data)
    }

    if (json.included) {
      for (let includedObject of json.included) {
        merge(changes, this._changeElementFromJsonapiObject(includedObject))
      }
    }

    const errors = this._deserializeErrors(json.errors)

    return [changes, errors, json.meta]
  }

  get renderedJson() {
    let jsonObject = {
      data: this._collectAllJsonPropsRecursively(this.attrs, this.baseConfig),
      meta: this._buildMetaInformation(this.attrs, this.baseConfig)
    }
    return jsonObject
  }

  // --- Private --- //

  _changeElementFromJsonapiObject(object) {
    let change = {}
    change[object.type] = {}
    change[object.type][object.id] =
      merge(object.attributes || {}, { id: object.id })
    return change
  }

  _collectAllJsonPropsRecursively(attrs, config) {
    if (String(attrs).match(/^\d+$/)) { // given obj was an ID, not a submodel
      return { id: String(attrs), type: config.type }
    } else {
      let jsonObject = {}
      this._addModelPropsToJson(jsonObject, attrs, config)
      this._addSubmodelPropsToJson(jsonObject, attrs, config)
      return jsonObject
    }
  }

  _buildMetaInformation(attrs, config) {
    let jsonObject = {}
    const form = this.form
    const metaFields = [ 'utf8', 'commit' ]

    for (let metaField of metaFields) {
      jsonObject[metaField] = form[metaField] && form[metaField].value
    }
    return jsonObject
  }

  _addModelPropsToJson(json, attrs, config) {
    json.type = config.type
    if (config.id) json.id = String(config.id)

    if (config.properties.length) json.attributes = {}

    for (let property of config.properties) {
      if (config.submodels.includes(property)) continue
      json.attributes[property] = attrs[property]
    }
  }

  // JSONAPI specs don't really talk about create/update of submodels...
  _addSubmodelPropsToJson(json, attrs, config) {
    const { submodelConfigs } = config

    forIn(submodelConfigs, (innerConfig, submodel) => {
      json.relationships = json.relationships || {}
      json.relationships[submodel] = {}

      if (attrs[submodel] && !attrs[submodel].length) return
      if (innerConfig.relationship == 'oneToOne') {
        json.relationships[submodel].data =
          this._collectAllJsonPropsRecursively(
            attrs[submodel][0], innerConfig)
      } else {
        json.relationships[submodel].data = attrs[submodel].map((subset) =>
          this._collectAllJsonPropsRecursively(subset, innerConfig)
        )
      }
    })
  }

  ///// error parsing (private) /////

  // { title: 'message', source: { pointer: '/data/attributes/foo' } }
  // /data/attributes/foo
  //    => { foo: message }
  // /data/relationships/foo/data/attributes/bar
  //    => foo: { bar: message }
  // /data/relationships/divisions/data/5/relationships/bars/data/2/attributes/baz
  //    => divisions: { 5: { bars: { 2: { baz: 'message' } } } }
  _deserializeErrors(jsonapiErrors) {
    let errors = {}
    if (jsonapiErrors) {
      const { rformData, formId } = this
      for (let err of jsonapiErrors) {
        let pointer = err.source.pointer

        const relationshipFinder =
          new RegExp('relationships/([^/]+)/data/(\\d+)?')

        let result
        let path = errors
        let errorFormId = formId
        while (result = pointer.match(relationshipFinder)) {
          pointer = pointer.substr(result.index + result[0].length)
          const relationName = result[1]
          const optionalIndex = result[2] || 0

          if (
            rformData[errorFormId]._registeredSubmodelForms &&
            rformData[errorFormId]._registeredSubmodelForms[relationName] &&
            rformData[errorFormId]
              ._registeredSubmodelForms[relationName][optionalIndex]
          ) {
            errorFormId =
              rformData[errorFormId]
                ._registeredSubmodelForms[relationName][optionalIndex]
          }

          // TODO: handle unregistered submodel - maybe use following as `else`
          // path[relationName] = path[relationName] || {}
          // path = path[relationName]
          // if (optionalIndex) {
          //   path[optionalIndex] = path[optionalIndex] || {}
          //   path = path[optionalIndex]
          // }
        }

        let attributeName = pointer.match(new RegExp('attributes/(.+)'))[1]
        path[errorFormId] = path[errorFormId] || {}
        path[errorFormId][attributeName] =
          path[errorFormId][attributeName] || []
        path[errorFormId][attributeName].push(err.title)
      }
    }
    return errors
  }
}
