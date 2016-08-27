import concat from 'lodash/concat'
import compact from 'lodash/compact'

export default function getErrors(
  formState, attribute, submodel, additionalErrors
) {
  // get saved & server provided errors, concat them together
  let stateErrors = []
  if (formState && formState.errors) {
    stateErrors =
      formState.errors[attribute] ||
      formState.errors[`${submodel}.${attribute}`] ||
      []
  }
  return compact(concat(stateErrors, additionalErrors))
}
