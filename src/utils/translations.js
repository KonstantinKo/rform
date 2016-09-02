import compact from 'lodash/compact'

export function optionalTranslation(...pathSteps) {
  if (!global.I18n) return

  // Extract options from last argument
  let options = {}
  if (typeof pathSteps[pathSteps.length-1] === 'object') {
    options = pathSteps.pop()
  }

  const path = compact(pathSteps).join('.')
  return global.I18n.t(path, options)
}
