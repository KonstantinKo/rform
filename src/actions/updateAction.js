// TODO: rename to updateForm or updateAttribute
export default (formId, attribute, submodelPath, value, changed) => ({
  type: '_RFORM_UPDATE_FORM_ATTRIBUTE',
  formId,
  attribute,
  submodelPath,
  value,
  changed,
})
