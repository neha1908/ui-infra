import React from 'react';
import { storiesOf } from '@storybook/react';
import figmaDecorator from 'storybook-addon-figma';
import LoginPage from './LoginPage';
import { withTheme } from '../theme';
import { noDataFixture, loadingFixture, basicDataFixture, mockFnFixture } from './LoginPage.fixtures';

storiesOf('LoginPage', module)
  .addDecorator(
    figmaDecorator({
      url: 'https://www.figma.com/file/BOplZaTF4OfjJMm7iH3xAfvs/Negotiation-Flow-LP?node-id=1%3A2',
    }),
  )
  .add('with no data', () => <LoginPage {...noDataFixture} />)
  .add('when loading', () => <LoginPage {...loadingFixture} />)
  .add('with basic data', () => <LoginPage {...basicDataFixture} {...mockFnFixture} />);
