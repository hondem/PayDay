import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import Loader from 'react-loader-spinner';

import { EmployeeItem } from '../..';
import { getCompanyEmployees } from '../../../../api/client/companies';
import { saveEmployeesAction } from '../../../../actions/employees';
import { getEmployees } from '../../../../selectors/employees';
import { Flex } from '../../../shared/layout';
import { THEME } from '../../../../theme';

import * as S from './EmployeeList.styles';

/* Props - <EmployeeList />
============================================================================= */
type Props = {};

/* <EmployeeList />
============================================================================= */
const EmployeeList: React.FunctionComponent<Props> = () => {
  const employees = useSelector(getEmployees);
  const dispatch = useDispatch<Dispatch<saveEmployeesAction>>();

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* Fetch all employees */
  const fetchEmployees = async () => {
    await getCompanyEmployees().then(({ data: list }) => {
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
        <Loader
          type="Puff"
          color={THEME.colors.blues[1]}
          height={80}
          width={80}
        />
      </Flex>
    );
  }

  /* Render list of employees */
  if (employees) {
    return (
      <S.Grid>
        {employees.map((employee, key) => (
          <EmployeeItem employee={employee} key={key} />
        ))}
      </S.Grid>
    );
  }

  return null;
};

export default EmployeeList;
