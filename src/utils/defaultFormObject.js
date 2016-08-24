import FormObject from '../FormObject'

export default function defaultFormObject() {
  let formObject = class DefaultFormObject extends FormObject {
		static get properties() {
			return [ 'query' ]
		}

		static get model() {
			return 'search'
		}
  }
  // formObject.__defineGetter__('properties', function() { return ['query'] })
  // formObject.__defineGetter__('model', function() { return 'search' })
  return formObject
}
