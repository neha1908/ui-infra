/* global fetch: true, window: true */
import 'whatwg-fetch';
import JqueryParam from 'jquery-param';
import { useLog } from '../components/hooks';

const isDevelopment = process.env.NODE_ENV === 'development';
const backendBaseUrl = () => window && window.BACKEND_BASE_URL || 'https://staging.indopus.in';
const baseUrl = () => isDevelopment && 'http://localhost:3000' || backendBaseUrl();

export const getHeaders = () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return headers;
};

const handleError = (e) => {
  const log = useLog();
  log({ type: 'error', title: 'Request Failed', payload: e });
  throw e;
};

export const makeRequest = (url, options) => {
  const absoluteUrl = baseUrl() + url;
  const log = useLog();
  log({ type: 'request', title: `Started ${absoluteUrl}`, payload: absoluteUrl });
  return fetch(absoluteUrl, options)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      log({ type: 'error', title: `Failed ${absoluteUrl}`, payload: response.statusText });
      error.code = response.status;
      return response
        .json()
        .then((body) => {
          /**
           * Always use an array for error messages for easier error handling
           */
          error.messages = body.errors || [ body.error ];
          throw error;
        })
        .catch((other_error) => {
          if (!error.message) error.message = 'Something went wrong';
          throw other_error;
        });
    })
    .then(response => response.json())
    .then((payload) => {
      log({ type: 'request', title: `Complete ${absoluteUrl}`, payload });
      return payload;
    })
    .catch(handleError);
};

export const get = ({ url, queryParams = {}, authToken = {}, signal = null }) => {
  const options = {
    method: 'GET',
    headers: {
      ...getHeaders(),
      ...authToken,
    },
    mode: 'cors',
    cache: 'default',
    signal,
  };
  if (!!queryParams && Object.keys(queryParams).length > 0) {
    url = `${url}?${JqueryParam(queryParams)}`; // eslint-disable-line 
  }
  return makeRequest(url, options);
};

export const put = ({ url, data, authToken = {} }) => {
  const options = {
    method: 'PUT',
    headers: {
      ...getHeaders(),
      ...authToken,
    },
    mode: 'cors',
    body: JSON.stringify(data),
  };
  return makeRequest(url, options);
};

export const post = ({ url, data, authToken = {} }) => {
  const options = {
    method: 'POST',
    headers: {
      ...getHeaders(),
      ...authToken,
    },
    mode: 'cors',
    body: JSON.stringify(data),
  };
  return makeRequest(url, options);
};
