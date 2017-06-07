export default class BaseAdapter {
  constructor(form, formObject) {
    this.form = form
    this.baseConfig = {
      model: formObject.constructor.model,
      submodels: formObject.constructor.submodels,
      type: formObject.constructor.type,
      properties: formObject.constructor.properties,
      submodelConfigs: formObject.constructor.collectedSubmodelConfigs,
      id: formObject.id,
    }
    this.attrs = formObject.attributes
    this.formId = formObject.formId
    this.rformData = formObject.rformData
  }
}
