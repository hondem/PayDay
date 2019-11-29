import React from 'react';

import { Heading } from '../../typography';

import * as S from './Panel.styles';

/* Props - <Panel />
============================================================================= */
export type PanelProps = {
  title?: string;
  isPadded?: boolean;
};

/* <Panel />
============================================================================= */
const Panel: React.FunctionComponent<PanelProps> = ({ title, isPadded, children }) => {
  return (
    <S.Wrapper>
      {title && (
        <S.Header>
          <Heading as="h3" mb="0">
            {title}
          </Heading>
        </S.Header>
      )}

      <S.Content isPadded={isPadded}>{children}</S.Content>
    </S.Wrapper>
  );
};

/* Default props - <Panel />
============================================================================= */
Panel.defaultProps = {
  isPadded: true,
};

export default Panel;
