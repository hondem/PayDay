import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const Wrapper = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.space[4]}px;
  min-height: 100vh;

  ${breakpoint('sm')`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  `}

  ${breakpoint('md')`
    flex: 4;
    align-items: initial;
    align-content: stretch;
    justify-content: flex-start;
  `}
`;

export const FeatureImage = styled.div`
  ${breakpoint('md')`
    flex: 2;
    display: block;
    background: url('/static/signup_background.jpg') no-repeat;
    background-size: cover;
    background-position-x: right;
  `}

  ${breakpoint('lg')`
    flex: 4;
  `}

  ${breakpoint('xxl')`
    flex: 8;
  `}
`;

export const Form = styled.div`
  margin: 0 auto;

  ${breakpoint('md')`
    max-width: 400px;
    margin: 0 0 0 ${({ theme }) => theme.space[7]}px;
  `}
`;

export const Separator = styled.div`
  width: 200px;
  height: 1px;
  margin: ${({ theme }) => theme.space[4]}px auto;
  background: ${({ theme }) => theme.colors.grays[0]};

  ${breakpoint('sm')`
    width: 300px;
    margin: ${({ theme }) => theme.space[6]}px auto;
  `}
`;
