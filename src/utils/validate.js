function validateForm(formObject) {
  let valid = true
  for (let property of formObject.constructor.properties) {
    if (!formObject.validate(property)) valid = false
  }
  return valid
}

export {
  validateForm
}
