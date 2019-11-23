import Cookies from "js-cookie";

export const COOKIE_AUTH_TOKEN = 'payday-auth-token';

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
 * Handles native fetch response.
 * 
 * @param res Reponse
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

/**
 * Stores auth token into a cookie.
 * 
 * @param token Auth token
 */
export const setAuthToken = (token: string) => Cookies.set(COOKIE_AUTH_TOKEN, token);

/**
 * Gets the auth token cookie.
 */
export const getAuthToken = () => Cookies.get('COOKIE_AUTH_TOKEN');