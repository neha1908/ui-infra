/* global window: true */
import { useState, useEffect, useCallback } from 'react';

export const useKeyPress = targetKey => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
};

/**
 * useLog
 *
 * Logs to your console in readable and debuggable format.
 * Although this doesn't replace browser debugger it gives good history of apps
 * execution flow if used at important execution points.
 *
 * Logs can be disabled selectively with levels. Disabled by default in production environment.
 * Works well along side redux-logger.
 *
 * Uses console.debug instead of console.log to avoid warnings and errors which otherwise make your
 * console unreadable. Switch to debug panel in console panel for a clean warning/error free console.
 *
 * Usage:
 * const log = useLog();
 * log({ title: 'auth', payload: auth })
 * // Keep verbose logs like logging state changes on a higher level
 * log({ title: 'auth', payload: state, type: 'state', level: 2 })
 *
 * useLogger props:
 *   level <number>: 0-9
 *     ~ Control logs at hooks level using this prop. Disable logs for specific components, pass level 0
 *   logLevel <number>: 0-9
 *      ~ Use this level when this hook is imported from expternal go-bits package.
 * log props:
 *   color <string>: 'black'
 *      Sets background  color for title. Use any custom color to pinpoint specific log
 *   type <symbol>: 'default' | 'state' | 'action' | 'request' | 'implement' | 'effect' | 'error' | 'reducer'
 *		~ Logs state change.
 *		~ 'action' is generally used for onAction or any component callback functions
 *		~ 'implement' can be used for switch blocks for default or as a Todo item
 *	 title <string>: 'no_title_specified'
 *	 payload <any>: {}
 *		~ Try to pass all js identifiers except state variables in object { constant, otherConstant }
 *		to make use of named console logs
 *	 level <number-range>: 1 <0-9>
 *		~ Higher the level equal deeper nestings and more verbose logs
 *
 * Use cases:
 *
 * Debug re-renders.
 * Reduce linter complaints for no-console rule.
 * Removes need to constantly switch between network and console tabs.
 **
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const LOG_LEVEL = isDevelopment ? 9 : 0;
// const LOG_LEVEL = 0; // Uncomment this to disable all logs
// const LOG_LEVEL = 1; // Minimal logging. Logs important code points.
// const LOG_LEVEL = 2; // Verbose logs. Log decorators, state changes at this level.
const USE_LOG_COLOR_PRESETS = true;

export const useLog = ({ level = 1, logLevel = 1 } = {}) => {
  const hookLevel = logLevel || level;
  const isValidLogLevel = hookLevel > 0 && (logLevel || LOG_LEVEL);
  if (!isValidLogLevel)
    return () => {
      // console.debug(
      //   `%c ${'Invalid useLog level'.toUpperCase().padStart(15)} `,
      //   `font-weight:bold;background-color:Red;color: white`,
      //   'if this hook was imported from go-bits use useLog({ logLevel: 1-9 }) instead',
      //   { hookLevel, LOG_LEVEL },
      // ); // eslint-disable-line
    };
  const defaultColor = 'black';

  return ({ type = 'default', color, title = 'no_title', payload = {}, level = 1 }) => { // eslint-disable-line
    const isValidLog = level > 0 &&  level <= hookLevel; 
    if (!isValidLog){
      // console.debug(
      //   `%c ${'Invalid log level'.toUpperCase().padStart(15)} `,
      //   `font-weight:bold;background-color:Red;color: white`,
      //   'if this hook was imported from go-bits use log({ level: 1-9 }) instead',
      //   { hookLevel, level: loggerLevel, goBitsGlobalLevel: LOG_LEVEL },
      //   ); // eslint-disable-line
      return;
    };

    const colorTypeMap = {
      default: 'Black',
      request: 'Indigo',
      render: 'Indigo',
      prop: 'Indigo',
      action: 'Green',
      effect: 'Green',
      warning: 'Yellow',
      reducer: 'Orange', // Use same color for all state mutations
      state: 'Orange',
      implement: 'Red',
      error: 'Red',
    };
    const hasCustomColor = color !== defaultColor;
    const logColor =
      (hasCustomColor && color) || // Use custom color if present
      ((USE_LOG_COLOR_PRESETS && colorTypeMap[type]) || defaultColor); // use Color presets if enabled or just use default color

    // Use headings smaller than 15 characters
    const heading = {
      default: title || 'Not Specified',
      action: 'Action Fired',
      effect: 'Effect Fired',
      prop: 'Prop Changed',
      implement: 'Implement',
      state: 'State Changed',
      request: 'Request',
      render: 'Render',
      reducer: 'Reducer',
      error: 'Error',
      warning: 'Warning',
    }[type];

    if (type === 'state' || type === 'prop') {
      useEffect(() => {
        console.debug(
          `%c ${heading.toUpperCase().padStart(15)} `,
          `font-weight:bold;background-color:${logColor};color: white`,
          title,
          payload,
        ); // eslint-disable-line
      }, [payload]);
    } else {
      console.debug(
        `%c ${heading.toUpperCase().padStart(15)} %c ${title}`,
        `font-weight:bold;background-color:${logColor};color: white`,
        `font-weight:bold;`,
        payload,
      ); // eslint-disable-line
    }
  };
};

export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below). 
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value] 
  );

  return debouncedValue;
}

// Measures and returns dimensions for elements
export const useDimensions = (defaults = null) => {
  const [rect, setRect] = useState(defaults);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
