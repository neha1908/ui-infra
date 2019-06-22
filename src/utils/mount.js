import React from 'react';
import { mount } from 'enzyme';
import { ThemeContainer } from '../components/theme'

const mountHelper = (component) => {
  const comp = mount(
    <ThemeContainer>
      {component}
    </ThemeContainer>
  );
  const mountedComponent = comp.children();
  mountedComponent.unmount = () => mountedComponent.parent().unmount;
  return mountedComponent;
};

export default mountHelper;
