import { NextPageContext } from 'next';

import { getAuthToken } from '.';
import { API } from '..';

export const getEmployee = (ctx: NextPageContext, companyId: number, employeeId: number) =>
  API.get<any>(`/companies/${companyId}/employees/${employeeId}`, {
    headers: {
      Authorization: getAuthToken(ctx),
    },
  });
