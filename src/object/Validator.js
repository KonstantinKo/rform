export default class Validator {
  constructor(property, attrs) {
    this.property = property
    this.attrs = attrs
  }

  // Require presence with optional additions
  filled(...predicates) {
    if (!this.attrs[this.property]) {
      this.attrs.errors[this.property] = this.attrs.errors[this.property] || []
      this.attrs.errors[this.property].push('must be filled')
    }

    for (let predicate of predicates) {
      switch (predicate) {
      case 'numericality':
        if (!/^\d+$/.test(this.attrs[this.property])) {
          this.attrs.errors[this.property] = this.attrs.errors[this.property] || []
          this.attrs.errors[this.property].push('must be a number')
        }
        break
      default:
        throw `Unknown predicate ${predicate}`
      }
    }
  }
}

