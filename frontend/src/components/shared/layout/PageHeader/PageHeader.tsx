import React from 'react';
import { Flex, Box } from '..';
import { Heading, Paragraph } from '../../typography';

import * as S from './PageHeader.styles';

/* Props - <PageHeader />
============================================================================= */
type Props = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
};

/* <PageHeader />
============================================================================= */
const PageHeader: React.FunctionComponent<Props> = ({ icon, title, subtitle, children }) => {
  return (
    <S.Wrapper>
      <Flex alignItems="center">
        <S.IconWrapper>{icon}</S.IconWrapper>

        <Box ml="s8">
          <Heading mb="s2">{title}</Heading>
          <Paragraph mb="0" color="grays.2" fontWeight="bold">
            {subtitle}
          </Paragraph>
        </Box>
      </Flex>

      <Flex alignItems="center">
        {children}
      </Flex>
    </S.Wrapper>
  );
};

/* Default props - <PageHeader />
============================================================================= */
PageHeader.defaultProps = {};

export default PageHeader;
