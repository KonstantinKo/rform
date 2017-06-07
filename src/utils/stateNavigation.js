import isNil from 'lodash/isNil'

export function navigateThroughSubmodels(
  basePath, submodelPath = [], fillEmpty = false, lastFill = {}
) {
  if (basePath && submodelPath.length) {
    for (let i = 0; i < submodelPath.length; i++) {
      let step = submodelPath[i]
      let isLastStep = i == submodelPath.length - 1

      if (!basePath[step] && fillEmpty)
        basePath[step] = isLastStep ? lastFill : {}
      basePath = basePath[step]
    }
  }

  return basePath
}
