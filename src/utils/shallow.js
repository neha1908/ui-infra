import React from 'react';
import { shallow } from 'enzyme';
import { ThemeContainer } from '../components/theme'

const shallowHelper = (component) => {
  const shallowRender = shallow(
    <ThemeContainer>
      {component}
    </ThemeContainer>
  );
  return shallowRender.children();
};

export default shallowHelper;
