import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.space.s10} 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.blues[1]};
  box-shadow: 0px 5px 22px -2px ${({ theme }) => theme.colors.blues[1]};
  border-radius: 4px;

  svg {
    color: white;
  }
`;