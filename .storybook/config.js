import { configure, addDecorator, addParameters } from '@storybook/react';
import { themes, create } from '@storybook/theming';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { addReadme } from 'storybook-readme';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import withTheme from '../src/components/withTheme';

import brandImage from './bizongo.svg';

// Option defaults.
addParameters({
  options: {
    panelPosition: 'bottom',
    showPanel: true,
    theme: create({
      base: 'dark',
      // ...themes.dark,

      // Typography
      fontBase: '"Open Sans", sans-serif',

      // Branding
      brandTitle: 'Go Bits',
      brandImage,
    }),
  },
});

addParameters({ viewport: { viewports: INITIAL_VIEWPORTS } });

addDecorator(
  withTheme,
  withA11y,
  withKnobs,
  addReadme,
);

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
