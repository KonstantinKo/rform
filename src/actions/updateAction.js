export default (formId, attribute, submodel, submodelIndex, value, changed) => ({
  type: 'UPDATE_FORM_ATTRIBUTE',
  formId,
  attribute,
  submodel,
  submodelIndex,
  value,
  changed,
})
