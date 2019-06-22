import React from 'react';
import { storiesOf } from '@storybook/react';
import figmaDecorator from 'storybook-addon-figma';
import Component from './Component';
import { noDataFixture, loadingFixture, basicDataFixture, mockFnFixture } from './Component.fixtures';

storiesOf('Component', module)
  .addDecorator(
    figmaDecorator({
      url: 'https://www.figma.com/file/BOplZaTF4OfjJMm7iH3xAfvs/Negotiation-Flow-LP?node-id=1%3A2',
    }),
  )
  .add('with no data', () => <Component {...noDataFixture} />)
  .add('when loading', () => <Component {...loadingFixture} />)
  .add('with basic data', () => <Component {...basicDataFixture} {...mockFnFixture} />);
