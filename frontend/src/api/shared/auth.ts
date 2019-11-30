import { NextPageContext } from 'next';

import { User } from '../../types/auth';
import { API } from '..';
import { getAuthToken } from '.';

/**
 * Gets user data.
 *
 * @param id ID of user for which to get data
 */
export const getUser = (ctx: NextPageContext, id: number) =>
  API.get<User>(`/users/${id}`, {
    headers: {
      Authorization: getAuthToken(ctx),
    },
  });
