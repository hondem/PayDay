import React from 'react';

import { Heading, Paragraph } from '../../../shared/typography';
import { Box, Flex } from '../../../shared/layout';

import * as S from './EmployeeItem.styles';
import Link from 'next/link';

/* Props - <EmployeeItem />
============================================================================= */
type Props = {
  employee: any;
};

/* <EmployeeItem />
============================================================================= */
const EmployeeItem: React.FunctionComponent<Props> = ({ employee }) => {
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
          <S.Tag isBold>#{employee.id}</S.Tag>
          <S.Tag>full-time</S.Tag>
        </Flex>
      </S.Main>

      <S.Footer>
        <Link href="/employees/[id]" as={`/employees/${employee.id}`}>
          <S.FooterButton>Upraviť</S.FooterButton>
        </Link>
        <S.FooterButton>Zmazať</S.FooterButton>
      </S.Footer>
    </S.Wrapper>
  );
};

export default EmployeeItem;
