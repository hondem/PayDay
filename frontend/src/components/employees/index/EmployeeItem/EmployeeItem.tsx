import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { Heading, Paragraph } from '../../../shared/typography';
import { Box, Flex } from '../../../shared/layout';
import { selectUser } from '../../../../selectors/auth';
import { deleteEmployee } from '../../../../api/client/companies';

import * as S from './EmployeeItem.styles';

/* Props - <EmployeeItem />
============================================================================= */
type Props = {
  employee: any;
  onEmployeeDelete: () => void;
};

/* <EmployeeItem />
============================================================================= */
const EmployeeItem: React.FunctionComponent<Props> = ({ employee, onEmployeeDelete }) => {
  const user = useSelector(selectUser);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);

  /**
   * Handles delete button click event.
   */
  const handleDelete = async () => {
    let confirmation = confirm(
      `Určite chcete odstrániť zamestnanca "${employee.osobni.meno} ${employee.osobni.priezvisko}"?`,
    );

    if (confirmation) {
      setIsDeleteInProgress(true);

      await deleteEmployee(user.companyId, employee.id).then(() => {
        onEmployeeDelete();
      });
    }
  };

  return (
    <S.Wrapper>
      <S.Main>
        <Box mb="s6">
          <Heading as="h3" mb="s2" textAlign="center">
            {employee.osobni.meno} {employee.osobni.priezvisko}
          </Heading>

          <Paragraph mb="0" textAlign="center">
            {employee.firemni.funkcia}
          </Paragraph>
        </Box>

        <Flex>
          <S.Tag isBold>#{employee.firemni.osobne_cislo}</S.Tag>
          <S.Tag>full-time</S.Tag>
        </Flex>
      </S.Main>

      <S.Footer>
        <Link href="/employees/[id]" as={`/employees/${employee.id}`}>
          <S.FooterButton>Upraviť</S.FooterButton>
        </Link>

        <S.FooterButton onClick={handleDelete}>
          {isDeleteInProgress ? 'Odstraňovanie...' : 'Odstrániť'}
        </S.FooterButton>
      </S.Footer>
    </S.Wrapper>
  );
};

export default EmployeeItem;
