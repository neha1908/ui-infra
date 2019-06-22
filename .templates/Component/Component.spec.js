import React from 'react';
import mount from '../../utils/mount';
import shallow from '../../utils/shallow';
import { noDataFixture, basicDataFixture, loadingFixture, mockFnFixture } from './Component.fixtures';
import Component from './Component';

describe('Component with no data', () => {
  let component;
  beforeEach(() => {
    component = shallow(<component {...noDataFixture} />);
  })

  it('should fail gracefully', () => {
    expect(component).toBeTruthy();
  });
});

describe('Component when loading', () => {
  let component;

  beforeEach(() => {
    component = mount(<component {...loadingfixture} />);
  })
  afterEach(() => component.unmount())

  it('should show loader', () => {
    const Loader = component.find('ComponentLoader');
    expect(Loader).toExist();
  });
});

describe('Component with basic data', () => {
  let component;
  beforeEach(() => {
    component = mount(<Component {...basicDataFixture} {...mockFnFixture} />);
  })
  afterEach(() => component.unmount())

  it('should render correct content', () => {
    const target = component.find('target');
    const expectedText = basicDataFixture.key;

    expect(target).toIncludeText(expectedText);
  });

  it('should call on clicking x', () => {
    const target = component.find('target');
    target.simulate('click');
    const expectedArgs = [];

    expect(mockFnFixture.onAction).toHaveBeenCalledWith(expectedArgs);
  });
});
