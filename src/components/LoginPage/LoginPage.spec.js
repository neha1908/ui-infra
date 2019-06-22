import React from 'react';
import shallow from '../../utils/shallow';
import { noDataFixture } from './LoginPage.fixtures';
import LoginPage from './LoginPage';

describe('LoginPage with no data', () => {
  let component;
  beforeEach(() => {
    component = shallow(<LoginPage {...noDataFixture} />);
  })

  it('should fail gracefully', () => {
    expect(component).toBeTruthy();
  });
});
