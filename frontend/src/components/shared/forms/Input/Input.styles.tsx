import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  isFocused: boolean;
  hasError: boolean;
};

export const Wrapper = styled.div<Props>`
  transition: all 0.2s ease-out;
  display: flex;
  width: 100%;
  min-height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.grays[0]};
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;

  ${({ isFocused, hasError }) => {
    if (isFocused) {
      return css`
        border-color: ${({ theme }) => theme.colors.blues[1]};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blues[1]};
      `;
    }

    if (hasError) {
      return css`
        border-color: ${({ theme }) => theme.colors.reds[1]};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.reds[1]};
      `;
    }
  }}
`;

export const IconWrapper = styled.div<Pick<Props, 'hasError'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  width: 60px;
  border-right: 1px solid ${({ theme }) => theme.colors.grays[0]};

  svg {
    width: 18px;
    color: ${({ theme }) => theme.colors.grays[0]};

    ${({ hasError }) =>
      hasError &&
      css`
        color: ${({ theme }) => theme.colors.reds[1]};
      `}
  }
`;

export const Input = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  transition: all 0.2s ease-out;
  flex: 1;
  width: 100%;
  min-height: 50px;
  padding: 0 ${({ theme }) => theme.space[3]}px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grays[3]};
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grays[1]};
  }
`;
