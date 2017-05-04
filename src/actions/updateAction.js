export default (formId, attribute, submodel, submodelIndex, value, changed) => ({
  type: '_RFORM_UPDATE_FORM_ATTRIBUTE',
  formId,
  attribute,
  submodel,
  submodelIndex,
  value,
  changed,
})
