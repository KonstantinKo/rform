import React from 'react'
import { shallow, mount } from 'enzyme'

import Label from './Label.jsx'

describe('<Label />', function() {
  const defaultProps = {
    model: 'testModel',
    attribute: 'testAttribute',
    value: ''
  }

  it('should render', function() {
    const wrapper = mount(<Label {...defaultProps} />)

    const label = wrapper.find('label')
    label.node.htmlFor.should.equal('testModel_testAttribute')
  })

  it('should output a label containing the submodel if submodel is present', function() {
    const wrapper = mount(<Label submodel="testSubmodel" {...defaultProps} />)

    const label = wrapper.find('label')
    label.node.htmlFor.should.equal('testModel_testSubmodel_testAttribute')
  })

  describe('with a className prop', function() {
    it('should "pass through" its className prop', function() {
      const wrapper = shallow(<Label className="dummy" {...defaultProps} />)

      const label = wrapper.find('label')
      label.hasClass('dummy').should.be.true
    })
  })
})
