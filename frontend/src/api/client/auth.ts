import { User } from '../../types/auth';
import { API } from '..';

/**
 * Sends a sign in request with user's credentials.
 *
 * @param email User's email address
 * @param password User's password
 */
export const signIn = (email: string, password: string) =>
  API.post<User>('/users/login', {
    email,
    password,
  });

/**
 * Gets user data.
 *
 * @param id ID of user for which to get data
 */
export const getUser = (id: number) => API.get(`/users/${id}`);
