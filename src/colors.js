/**
 *
 * This file contains all brand colors that are used across this application.
 * It is recommended not to use any custom colors in stylesheets that are not present in this file.
 * If that is unavoidable define those colors in this file with prefix `CUSTOM_` so that it is easy to switch those later with brand colors
 *
 * Reference https://marvelapp.com/52c5e5f/screen/49805354
 *
 */
import { darken } from 'polished';

// Primary brand Color
export const BLUE = '#0486ff';
export const BLUE_105 = darken(0.05, BLUE);
export const BLUE_120 = darken(0.1, BLUE);
export const BLUE_80 = '#379fff';
export const BLUE_60 = '#8cc7ff';
export const BLUE_40 = '#d0e8ff';
export const BLUE_20 = '#f1f8ff';

// Dark Blue Shade
export const DARK_BLUE = '#3e4977';
export const DARK_BLUE_105 = darken(0.05, DARK_BLUE);
export const DARK_BLUE_120 = darken(0.05, DARK_BLUE);
export const DARK_BLUE_40 = '#949bbc';
export const DARK_BLUE_60 = '#747ea9';

// Grayscale
export const GREY_80 = '#cbd1e0';
export const GREY_60 = '#d7ddeb';
export const GREY_40 = '#e2e7f4';
export const GREY_20 = '#f2f4f8';
export const GREY_10 = '#f7f8fb';

// Green
export const GREEN = '#00ac65';
export const GREEN_120 = darken(0.05, '#00ac65');
export const GREEN_80 = '#00bd6f';
export const GREEN_40 = '#cff0e2';
export const GREEN_20 = '#f6fef8';

// Reds
export const RED = '#d0021b';
export const RED_120 = darken(0.05, RED);
export const RED_60 = '#fc6c7d';
export const RED_40 = '#febfc7';
export const RED_20 = '#ffe6e9';

// Yellow
export const YELLOW = '#edb72f';
export const YELLOW_120 = darken(0.05, YELLOW);
export const YELLOW_60 = '#f2cd6e';
export const YELLOW_20 = '#fff7e8';

// Purple = Not as per brand book, which we have not recd
export const PURPLE = '#9657ce';
export const PURPLE_80 = '#af7eda';
export const PURPLE_20 = '#f2e4ff';

// BLACK
export const BLACK = '#111';
export const BLACK_120 = '#000';

// WHITE
export const WHITE = '#FFFFFF';

// Custom colors that should be converged later
export const BOX_SHADOW = 'rgba(226, 231, 244, 0.8)';
export const BOX_SHADOW_DARK = 'rgba(0, 0, 0, 0.04)';

// Convert COlor to RGB Format
export const hexToRgb = hex => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b); // eslint-disable-line

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
};

export const rgba = (hex, alpha) => {
  const color = hexToRgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};
