import axios from 'axios';

import { getAuthToken } from './client';
import { ErrorReponse } from '../types/common';

export const COOKIE_ACCESS_TOKEN = 'accessToken';

/**
 * Creates Axios instance.
 */
export const API = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* Request interceptor */
API.interceptors.request.use(
  config => {
    const authToken = getAuthToken();

    /* Set auth header if token is stored in cookies */
    if (authToken) {
      config.headers.post['Authorization'] = `Bearer ${getAuthToken}`;
    }

    return config;
  },
  error => Promise.reject<ErrorReponse>({ error, response: error.response?.data }),
);

/* Response interceptor */
API.interceptors.response.use(null, error =>
  Promise.reject<ErrorReponse>({ error, response: error.response?.data }),
);

/**
 * Handles native fetch response.
 *
 * @param res Response
 */
export const handleResponse = async (res: Response) => {
  if (res.ok) {
    if (res.status === 200) {
      try {
        const response = await res.json();
        return response;
      } catch (e) {
        return await Promise.resolve({});
      }
    }
    return Promise.resolve({});
  } else {
    if (typeof res.json === 'function') {
      const err = await res.json();
      throw { response: err, status: res.status, headers: res.headers };
    } else {
      throw { response: undefined, status: res.status, headers: res.headers };
    }
  }
};
