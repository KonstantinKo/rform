export default (
  unregisteringFormId, submodelName, unregisteredSubmodelFormId
) => ({
  type: '_RFORM_UNREGISTER_SUBMODEL_FORM',
  unregisteringFormId,
  submodelName,
  unregisteredSubmodelFormId,
})
