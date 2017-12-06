import ProgramTile from '../../src/components/ProgramTile';
import { mount } from 'enzyme';
import React from 'react';


describe('ProgramTile', () => {
  let id,
      title,
      wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ProgramTile
        id= "1"
        title="I am an ProgramTile!"
      />
    );
  });

  it('should render a h1 tag', () => {
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('should render a link', () => {
    expect(wrapper.find('Link').length).toEqual(1);
  });

  it('should render an h1 tag with the title property value', () => {
    expect(wrapper.find('h1').text()).toBe('I am an ProgramTile!');
  });

  it('should render a image', () => {
    expect(wrapper.find('img').length).toEqual(1);
  });
});
