export function getName(
  model, attribute, multipleSubmodels, submodelPath = []
) {
  let name = model
  for (let step of submodelPath) {
    name += `[${step}]`
  }
  if (multipleSubmodels) {
    return `${name}[][${attribute}]` // TODO: Does this even work in rails?
  } else {
    return `${name}[${attribute}]`
  }
}

export function getId(formId, model, attribute, submodelPath = []) {
  let id = `${formId}_${model}_`
  for (let step of submodelPath) {
    id += `${step}_`
  }
  return `${id}_${attribute}`
}
