export default (formId, attribute, submodel, value, changed) => ({
  type: 'UPDATE_FORM_ATTRIBUTE',
  formId,
  attribute,
  submodel,
  value,
  changed,
})
