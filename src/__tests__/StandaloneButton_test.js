import React from 'react'
import { mount } from 'enzyme'

import StandaloneButton from './StandaloneButton'

describe('<StandaloneButton />', function() {
  const defaultProps = {
    authToken: 'xxx',
    action: '/users/sign_out',
    method: 'DELETE'
  }

  describe('with minimal props', function() {
    it('should render', function() {
      const wrapper = mount(<StandaloneButton {...defaultProps} />)

      const button = wrapper.find('button')
      button.length.should.equal(1)
    })
  })

  describe('with a className prop', function() {
    it('should "pass through" its className prop to the button element', function() {
      const wrapper = mount(<StandaloneButton className="dummy" {...defaultProps} />)

      const button = wrapper.find('button')
      button.hasClass('dummy').should.be.true
    })
  })
})
