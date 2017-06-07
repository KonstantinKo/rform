export default (formId, formObject, onlyKey = null) => ({
  type: '_RFORM_UPDATE_ERROR',
  formId,
  formObject,
  onlyKey,
})
