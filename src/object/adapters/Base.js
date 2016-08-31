export default class BaseAdapter {
  constructor(form, formObject) {
    this.form = form
    this.properties = formObject.constructor.properties
    this.submodelProperties = formObject.constructor.submodelProperties
    this.model = formObject.constructor.model
    this.attrs = formObject.attributes
    this.id = formObject.id
  }
}
