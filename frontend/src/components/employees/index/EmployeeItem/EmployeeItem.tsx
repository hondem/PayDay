import React from 'react';

import { Heading, Paragraph } from '../../../shared/typography';
import { Box, Flex } from '../../../shared/layout';

import * as S from './EmployeeItem.styles';

/* Props - <EmployeeItem />
============================================================================= */
type Props = {};

/* <EmployeeItem />
============================================================================= */
const EmployeeItem: React.FunctionComponent<Props> = () => {
  return (
    <S.Wrapper>
      <S.Main>
        <Box mb="s6">
          <Heading as="h3" mb="s2">
            John Kunda
          </Heading>
          <Paragraph mb="0">C Fucking O</Paragraph>
        </Box>

        <Flex>
          <S.Tag isBold>#0000042</S.Tag>
          <S.Tag>full-time</S.Tag>
        </Flex>
      </S.Main>

      <S.Footer>
        <S.FooterButton>Upraviť</S.FooterButton>
        <S.FooterButton>Zmazať</S.FooterButton>
      </S.Footer>
    </S.Wrapper>
  );
};

export default EmployeeItem;
