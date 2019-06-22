import React from 'react';
import shallow from '../../utils/shallow';
import { noDataFixture } from './LoginCard.fixtures';
import LoginCard from './LoginCard';

describe('LoginCard with no data', () => {
  let component;
  beforeEach(() => {
    component = shallow(<LoginCard {...noDataFixture} />);
  })

  it('should fail gracefully', () => {
    expect(component).toBeTruthy();
  });
});
