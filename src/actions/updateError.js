export default (formId, errors, onlyKey = null) => ({
  type: '_RFORM_UPDATE_ERROR',
  formId,
  errors,
  onlyKey,
})
