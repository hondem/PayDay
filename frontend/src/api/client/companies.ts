import { NextPageContext } from 'next';

import { API } from '..';
import { getAuthToken } from '.';

/**
 * Get company employees.
 *
 * @param ctx NextJS context
 * @param companyId ID of the company for which to get users
 */
export const getCompanyEmployees = (companyId: number = 1) =>
  API.get<object[]>(`/companies/${companyId}/employees`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
