import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';

import { getAuthHeaders } from '.';

export const getUser = (ctx: NextPageContext, id: number) =>
  fetch(`${process.env.API_URL}/users/${id}`, {
    method: 'GET',
    headers: getAuthHeaders(ctx),
  });