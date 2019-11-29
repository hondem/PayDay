import React from 'react';

import { EmployeeItem } from '../..';

import * as S from './EmployeeList.styles';

/* Props - <EmployeeList />
============================================================================= */
type Props = {

};

/* <EmployeeList />
============================================================================= */
const EmployeeList: React.FunctionComponent<Props> = () => {
  return (
    <S.Grid>
      <EmployeeItem />
      <EmployeeItem />
      <EmployeeItem />
      <EmployeeItem />
      <EmployeeItem />
      <EmployeeItem />
    </S.Grid>
  );
};

/* Default props - <EmployeeList />
============================================================================= */
EmployeeList.defaultProps = {

};

export default EmployeeList;