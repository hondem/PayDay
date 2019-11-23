import Cookies from "js-cookie";
import { COOKIE_ACCESS_TOKEN } from "..";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";

/**
 * Gets basic header params with bearer auth token.
 * 
 * @param headers Header params
 */
export const getAuthHeaders = (ctx: NextPageContext, headers = {}) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Authorization': `Bearer ${getAuthToken(ctx)}`,
  ...headers,
});

/**
 * Gets the auth token cookie.
 */
export const getAuthToken = (ctx: NextPageContext) => {
  const {accessToken} = parseCookies(ctx);
  return accessToken;
}