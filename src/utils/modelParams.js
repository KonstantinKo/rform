export function getName(model, submodel, attribute) {
  if (submodel) {
    return `${model}[${submodel}][${attribute}]`
  } else {
    return `${model}[${attribute}]`
  }
}

export function getId(formId, model, submodel, attribute) {
  if (submodel) {
    return `${formId}_${model}_${submodel}_${attribute}`
  } else {
    return `${formId}_${model}_${attribute}`
  }
}
