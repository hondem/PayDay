import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  margin: ${({ theme }) => theme.space.s4} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
    margin: 0;
  }
`;

export const Form = styled.div`
  margin: 0 ${({ theme }) => theme.space.s4};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 360px;
    margin: 0 0 0 ${({ theme }) => theme.space[7]}px;
  }
`;

export const Separator = styled.div`
  width: 200px;
  height: 1px;
  margin: ${({ theme }) => theme.space.s8} auto;
  background: ${({ theme }) => theme.colors.grays[0]};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 300px;
    margin: ${({ theme }) => theme.space[6]}px auto;
  }
`;
