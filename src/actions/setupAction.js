export default function setForm(formId, formData) {
  return {
    type: '_RFORM_SET_FORM',
    formId,
    formData,
  }
}
