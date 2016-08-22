export default function setForm(formId, formData) {
  return {
    type: 'SET_FORM',
    formId,
    formData,
  }
}
