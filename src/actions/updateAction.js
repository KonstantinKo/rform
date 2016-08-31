export default (formId, attribute, submodel, value) => ({
  type: 'UPDATE_FORM_ATTRIBUTE',
  formId,
  attribute,
  submodel,
  value
})

export function updateErrors(formId, attribute, submodel, value) {
  return {
    type: 'UPDATE_FORM_ERRORS',
    formId,
    attribute,
    submodel,
    value
  }
}
