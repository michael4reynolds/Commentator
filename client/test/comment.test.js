import React from 'react'
import expect from 'expect'
import {shallow} from 'enzyme'
import Comment from '../src/components/comment'


describe('Sanity Check', () => {
  it('does all the things', () => {
    expect(true).toEqual(true)
  })
})

describe('<Comment/>', () => {
  it('should render there <App/>', () => {
    expect(true).toEqual(true)
    const about = shallow(<Comment author="Michael">Hello</Comment>)
    expect(about.find('div').length).toEqual(1)
  })
})