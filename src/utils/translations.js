export function optionalTranslation(model, submodel, attribute, selector) {
  if (!global.I18n) return
  let path = 'rform'
  if (model) path += '.' + model
  if (submodel) path += '.' + submodel
  if (attribute) path += '.' + attribute
  path += '.' + selector
  return global.I18n.t(path)
}
