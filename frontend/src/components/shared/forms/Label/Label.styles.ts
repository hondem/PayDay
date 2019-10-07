import styled from 'styled-components';

export const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.grays[2]};
  margin-bottom: ${({ theme }) => theme.space[2]}px;
`;