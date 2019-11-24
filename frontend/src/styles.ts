import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Global styles
  ============================================================================= */
  body {
    padding: 0;
    margin: 0;
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.grays[3]};
    background: ${({ theme }) => theme.colors.background};
  }
`;
