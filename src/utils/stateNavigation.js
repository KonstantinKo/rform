import isNil from 'lodash/isNil'

export function navigateThroughSubmodels(
  basePath, submodel, submodelIndex, fillEmpty = false, lastFill = {}
) {
  if (basePath && submodel) {
    if (!basePath[submodel] && fillEmpty) basePath[submodel] = {}
    basePath = basePath[submodel]
    if (basePath && !isNil(submodelIndex)) {
      if (!basePath[submodelIndex] && fillEmpty)
        basePath[submodelIndex] = lastFill
      basePath = basePath[submodelIndex]
    }
  }

  return basePath
}
