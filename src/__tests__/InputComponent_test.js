import React from 'react'
import { mount } from 'enzyme'

import InputComponent from './InputComponent.jsx'

const errorClass = 'inline-errors'

describe('InputComponent', function() {
  const defaultProps = {
    model: 'testModel',
    attribute: 'testAttribute',
    value: '',
    formId: 'foo',
    errors: []
  }

  describe('with minimal props', function() {
    it('should output an input tag of default type text', function() {
      const wrapper = mount(<InputComponent {...defaultProps} />)

      const input = wrapper.find('input')
      input.length.should.equal(1)
      input.node.type.should.equal('text')
      input.node.id.should.equal('testModel_testAttribute')
      input.node.name.should.equal('testModel[testAttribute]')
    })

    it('wont output any errors', function() {
      const wrapper = mount(<InputComponent {...defaultProps} />)

      const errors = wrapper.find(`.${errorClass}`)
      errors.length.should.equal(0)
    })
  })

  describe('labels', function() {
    it('should output a default label', function() {
      const wrapper = mount(<InputComponent {...defaultProps} />)

      const div = wrapper.find('div')
      div
        .children().nodes
        .map((el) => el.constructor.name)
        .should.deep.equal(['HTMLLabelElement', 'HTMLInputElement'])

      const label = wrapper.find('label')
      label.node.htmlFor.should.equal('testModel_testAttribute')
    })

    it('should not output a label in inline label mode', function() {
      const wrapper = mount(<InputComponent inlineLabel {...defaultProps} />)

      const label = wrapper.find('label')
      label.length.should.equal(0)
    })

    it('should set the aria-label attribute in inline label mode', function() {
      const wrapper = mount(<InputComponent inlineLabel {...defaultProps} />)

      const input = wrapper.find('input')
      input.node.hasAttribute('aria-label').should.be.true
    })

    it('should not set the aria-label attribute normally', function() {
      const wrapper = mount(<InputComponent {...defaultProps} />)

      const input = wrapper.find('input')
      input.node.hasAttribute('aria-label').should.be.false
    })

    it('should not output a label if noLabel is set', function() {
      const wrapper = mount(<InputComponent noLabel {...defaultProps} />)

      const label = wrapper.find('label')
      label.length.should.equal(0)
    })
  })

  describe('with a submodel', function() {
    it('should output a label containing that submodel', function() {
      const wrapper = mount(<InputComponent submodel="testSubmodel" {...defaultProps} />)

      const label = wrapper.find('label')
      label.node.htmlFor.should.equal('testModel_testSubmodel_testAttribute')
    })

    it('should output an input tag with that submodel', function() {
      const wrapper = mount(<InputComponent submodel="testSubmodel" {...defaultProps} />)

      const input = wrapper.find('input')
      input.node.id.should.equal('testModel_testSubmodel_testAttribute')
      input.node.name.should.equal('testModel[testSubmodel][testAttribute]')
    })
  })

  describe('with a valid type', function() {
    it('should output an input tag with that type', function() {
      const wrapper = mount(<InputComponent type="number" {...defaultProps} />)

      const input = wrapper.find('input')
      input.node.type.should.equal('number')
    })
  })

  describe('with errors', function() {
    it('must output those errors', function() {
      const wrapper = mount(<InputComponent {...defaultProps} errors={['foo', 'bar']} />)

      const errors = wrapper.find(`.${errorClass}`)
      errors.length.should.equal(1)
      errors.first().text().should.equal('foo, bar')

      const div = wrapper.find('div')
      div.hasClass('has-errors').should.be.true
    })
  })

  describe('with a textarea type', function() {
    it('must output a non-standard input field', function() {
      const wrapper = mount(<InputComponent type="textarea" {...defaultProps} />)

      const input = wrapper.find('input')
      input.length.should.equal(0)

      const area = wrapper.find('textarea')
      area.length.should.equal(1)
      area.node.id.should.equal('testModel_testAttribute')
      area.node.name.should.equal('testModel[testAttribute]')
    })
  })

  describe('with a checkbox type', function() {
    it ('should render the label after the input element', function() {
      const wrapper = mount(<InputComponent type="checkbox" {...defaultProps} />)

      const div = wrapper.find('div')
      div
        .children().nodes
        .map((el) => el.constructor.name)
        .should.deep.equal(['HTMLInputElement', 'HTMLLabelElement'])
    })
  })

  describe('with a className prop', function() {
    it('should "pass through" its className prop', function() {
      const wrapper = mount(<InputComponent className="dummy" {...defaultProps} />)

      const div = wrapper.find('div')
      div.hasClass('dummy').should.be.true
    })
  })
})
