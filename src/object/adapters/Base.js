export default class BaseAdapter {
  constructor(form, formObject) {
    this.form = form
    this.properties = formObject.constructor.properties
    this.submodelConfig = formObject.constructor.submodelConfig
    this.model = formObject.constructor.model
    this.attrs = formObject.attributes
    this.id = formObject.id
  }
}
