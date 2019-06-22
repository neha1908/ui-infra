import React from 'react';
import { storiesOf } from '@storybook/react';
import LoginCard from './LoginCard';
import { noDataFixture, loadingFixture, basicDataFixture, mockFnFixture } from './LoginCard.fixtures';

storiesOf('LoginCard', module)
  .add('with no data', () => <LoginCard {...noDataFixture} />)
  .add('when loading', () => <LoginCard {...loadingFixture} />)
  .add('with basic data', () => <LoginCard {...basicDataFixture} {...mockFnFixture} />);
