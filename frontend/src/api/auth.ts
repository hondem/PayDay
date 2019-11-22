import { getHeaders } from '.';

/**
 * Sends a sign in request with user's credentials.
 * 
 * @param email User's email address
 * @param password User's password
 */
export const signIn = (email: string, password: string) =>
  fetch(`${process.env.API_URL}/users/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      email,
      password,
    }),
  });
