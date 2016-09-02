export default (formId, attribute, submodel, value) => ({
  type: 'UPDATE_FORM_ATTRIBUTE',
  formId,
  attribute,
  submodel,
  value
})
