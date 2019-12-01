import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import Loader from 'react-loader-spinner';

import { EmployeeItem } from '../..';
import { getCompanyEmployees } from '../../../../api/client/companies';
import { saveEmployeesAction } from '../../../../actions/employees';
import { selectEmployees } from '../../../../selectors/employees';
import { Flex } from '../../../shared/layout';
import { selectUser } from '../../../../selectors/auth';

import * as S from './EmployeeList.styles';
import { THEME } from '../../../../theme';

/* <EmployeeList />
============================================================================= */
const EmployeeList: React.FunctionComponent = () => {
  const user = useSelector(selectUser);
  const employees = useSelector(selectEmployees);
  const dispatch = useDispatch<Dispatch<saveEmployeesAction>>();

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* Fetch all employees */
  const fetchEmployees = async () => {
    await getCompanyEmployees(user.companyId).then(({ data: list }) => {
      dispatch({
        type: '[EMPLOYEES] SAVE_EMPLOYEES',
        payload: {
          list,
        },
      });
    });
  };

  /* Render loader during waiting for fetch response */
  if (employees === null) {
    return (
      <Flex justifyContent="center">
      <Loader type="Puff" color={THEME.colors.blues[1]} height={80} width={80} />
    </Flex>
    );
  }

  /* Render list of employees */
  if (employees) {
    return (
      <S.Grid>
        {employees.map((employee, key) => (
          <EmployeeItem employee={employee} onEmployeeDelete={fetchEmployees} key={key} />
        ))}
      </S.Grid>
    );
  }

  return null;
};

export default EmployeeList;
