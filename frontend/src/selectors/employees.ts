import { createSelector } from 'reselect';

import { AppState } from '../reducers';
import { EmployeesState } from '../reducers/employees';

export const getEmployeesState = (state: AppState): EmployeesState => state.employees;

export const getEmployees = createSelector<AppState, EmployeesState, object[]>(getEmployeesState, state => state.list);
