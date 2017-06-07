import concat from 'lodash/concat'
import compact from 'lodash/compact'

export default function getErrors(
  formState, attribute, submodelPath = [], additionalErrors = []
) {
  // get saved & server provided errors, concat them together
  let stateErrors = []
  if (formState && formState[ERRORCONTAINER]) {
    stateErrors =
      formState[ERRORCONTAINER][errorKey(attribute, submodelPath)] || []
  }
  return compact(concat(stateErrors, additionalErrors))
}

export function errorKey(property, submodelPath = []) {
  submodelPath = compact(submodelPath)
  submodelPath.push(property)
  return submodelPath.join('.')
}

export const ERRORCONTAINER = '_errors'
