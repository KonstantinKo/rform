export function getName(model, submodel, attribute, multipleSubmodels) {
  if (submodel) {
    if (multipleSubmodels) {
      return `${model}[${submodel}][][${attribute}]`
    } else {
      return `${model}[${submodel}][${attribute}]`
    }
  } else {
    return `${model}[${attribute}]`
  }
}

export function getId(formId, model, submodel, attribute, submodelIndex) {
  if (submodel) {
    if (submodelIndex) {
      return `${formId}_${model}_${submodel}_${submodelIndex}_${attribute}`
    } else {
      return `${formId}_${model}_${submodel}_${attribute}`
    }
  } else {
    return `${formId}_${model}_${attribute}`
  }
}
