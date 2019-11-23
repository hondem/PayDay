import Cookies from "js-cookie";
import { COOKIE_ACCESS_TOKEN } from "..";

/**
 * Gets basic header params.
 * 
 * @param headers Header params
 */
export const getHeaders = (headers = {}) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...headers,
});

/**
 * Gets basic header params with bearer auth token.
 * 
 * @param headers Header params
 */
export const getAuthHeaders = (headers = {}) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`,
  ...headers,
});

/**
 * Stores auth token into a cookie.
 * 
 * @param token Auth token
 */
export const setAuthToken = (token: string) => Cookies.set(COOKIE_ACCESS_TOKEN, token);

/**
 * Gets the auth token cookie.
 */
export const getAuthToken = () => Cookies.get(COOKIE_ACCESS_TOKEN);

/**
 * Removes the auth token cookie.
 */
export const removeAuthToken = () => Cookies.remove(COOKIE_ACCESS_TOKEN);