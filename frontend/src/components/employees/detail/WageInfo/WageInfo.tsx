import React from 'react';

import { Label, Input, Select, ErrorMessage } from '../../../shared/forms';
import { Grid, Flex } from '../../../shared/layout';
import { SelectOption } from '../../../../types/common';
import { Heading, Paragraph } from '../../../shared/typography';

/* Props - <WageInfo />
============================================================================= */
type Props = {
  formType: string | string[];
};

/* <WageInfo />
============================================================================= */
const WageInfo: React.FunctionComponent<Props> = ({ formType }) => {
  switch (formType) {
    case 'employment': return (
      <span>Employment form here</span>
    )

    default: return (
      <Flex flexDirection="column" alignItems="center">
        <Heading textAlign="center" mb="s4">404</Heading>
        <Paragraph textAlign="center">Požadovaná stránka neexistuje.</Paragraph>
      </Flex>
    );
  }
};

export default WageInfo;
