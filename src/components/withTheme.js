import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.less';
import theme from './theme';

/**
 * Storybook decorator for styled-components theme.
 */
const mapStoryToThemeProvider = theme => story => { // eslint-disable-line 
  return <ThemeProvider theme={theme}>{story()}</ThemeProvider>
};
const withTheme = story => mapStoryToThemeProvider(theme)(story);

export default withTheme;
