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

/**
 * Updates employee by his ID.
 *
 * @param companyId ID of company employee belongs to
 * @param employeeID ID of employee that has to be updated
 */
export const updateEmployee = (companyId: number, employeeId: number, employee: any) =>
  API.patch(
    `/companies/${companyId}/employees/${employeeId}`,
    {
      ...employee,
    },
    {
      headers: {
        Authorization: getAuthToken(),
      },
    },
  );

/**
 * Deletes employee by his ID.
 *
 * @param companyId ID of company employee belongs to
 * @param employeeID ID of employee that has to be deleted
 */
export const deleteEmployee = (companyId: number, employeeId: number) =>
  API.delete(`/companies/${companyId}/employees/${employeeId}`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
