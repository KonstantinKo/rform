export function getName(model, submodel, attribute) {
  if (submodel) {
    return `${model}[${submodel}][${attribute}]`
  } else {
    return `${model}[${attribute}]`
  }
}

export function getId(model, submodel, attribute) {
  if (submodel) {
    return `${model}_${submodel}_${attribute}`
  } else {
    return `${model}_${attribute}`
  }
}
