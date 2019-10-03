import styled, { css } from 'styled-components';
import { space } from 'styled-system';

import { HeadingProps } from './Heading';

const getHeadingSize = ({ as }: Pick<HeadingProps, 'as'>) => {
  switch (as) {
    case 'h1':
      return css`
        font-size: 36px;
      `;
    case 'h2':
      return css`
        font-size: 30px;
      `;
    case 'h3':
      return css`
        font-size: 26px;
      `;
    case 'h4':
      return css`
        font-size: 20px;
      `;
  }
};

export const HeadingStyled = styled.div<HeadingProps>`
  color: ${({ theme }) => theme.colors.blues[1]};

  ${({ as }) => getHeadingSize({ as })}

  ${space}
`;
