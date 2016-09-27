import FormObject from '../object/FormObject'
import compact from 'lodash/compact'
import flatten from 'lodash/flatten'
import React from 'react'

export default function defaultFormObject(model, children) {
  const properties = collectPropertiesFromAllChildren(children)

  let formObject = class DefaultFormObject extends FormObject {
    static get properties() {
      return properties
    }

    static get model() {
      return model
    }
  }
  // formObject.__defineGetter__('properties', function() { return ['query'] })
  // formObject.__defineGetter__('model', function() { return 'search' })
  return formObject
}

function collectPropertiesFromAllChildren(children) {
  let properties = []

  React.Children.map(children, child => {
    if (!child.props) return
    if (child.props.attribute) properties.push(child.props.attribute)
    if (child.props.children) {
      const recursiveProperties =
        collectPropertiesFromAllChildren(child.props.children)
      properties.push(recursiveProperties)
    }
  })

  return compact(flatten(properties))
}
