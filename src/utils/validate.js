import assign from 'lodash/assign'
import values from 'lodash/values'
import forIn from 'lodash/forIn'

function validateForm(baseFormObject) {
  let returnHash = { valid: true, errors: {} }
  forIn(_relevantFormObjects(baseFormObject), (formObject, formId) => {
    let errors = formObject.validate()
    if (errors) {
      returnHash.valid = false
      returnHash.errors[formId] = errors
    }
  })
  return returnHash
}

function _relevantFormObjects(baseFormObject) {
  let objects = {}
  objects[baseFormObject.formId] = baseFormObject

  let subFormObjects = baseFormObject.submodelFormObjects
  while (values(subFormObjects).length) {
    assign(objects, subFormObjects)
    subFormObjects =
      assign(...values(subFormObjects).map(fo => fo.submodelFormObjects))
  }

  return objects
}

export {
  validateForm
}
