import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { MarginProps, margin } from 'styled-system';

/* Props - <Button />
============================================================================= */
type ButtonProps = {
  color?: 'red' | 'yellow' | 'blue' | 'green';
} & MarginProps;

/* <Button />
============================================================================= */
const getButtonColor = ({ color }: ButtonProps) => {
  switch (color) {
    case 'red':
      return css`
        border-color: ${({ theme }) => theme.colors.reds[1]};
        background: ${({ theme }) => theme.colors.reds[1]};

        &:hover,
        &:focus {
          box-shadow: 0px 10px 30px -15px ${({ theme }) => theme.colors.reds[1]};
          outline: none;
        }

        &:disabled {
          border-color: ${({ theme }) => theme.colors.reds[0]};
          background: ${({ theme }) => theme.colors.reds[0]};
        }
      `;
    case 'yellow':
      return css`
        border-color: ${({ theme }) => theme.colors.yellows[1]};
        background: ${({ theme }) => theme.colors.yellows[1]};

        &:hover,
        &:focus {
          box-shadow: 0px 10px 30px -15px ${({ theme }) => theme.colors.yellows[1]};
          outline: none;
        }

        &:disabled {
          border-color: ${({ theme }) => theme.colors.yellows[0]};
          background: ${({ theme }) => theme.colors.yellows[0]};
        }
      `;
    case 'blue':
      return css`
        border-color: ${({ theme }) => theme.colors.blues[1]};
        background: ${({ theme }) => theme.colors.blues[1]};

        &:hover,
        &:focus {
          box-shadow: 0px 10px 30px -15px ${({ theme }) => theme.colors.blues[1]};
          outline: none;
        }

        &:disabled {
          border-color: ${({ theme }) => theme.colors.blues[0]};
          background: ${({ theme }) => theme.colors.blues[0]};
        }
      `;
    case 'green':
      return css`
        border-color: ${({ theme }) => theme.colors.greens[1]};
        background: ${({ theme }) => theme.colors.greens[1]};

        &:hover,
        &:focus {
          box-shadow: 0px 10px 30px -15px ${({ theme }) => theme.colors.greens[1]};
          outline: none;
        }

        &:disabled {
          border-color: ${({ theme }) => theme.colors.greens[0]};
          background: ${({ theme }) => theme.colors.greens[0]};
        }
      `;
  }
};

const Button = styled.button<ButtonProps>`
  transition: all 0.2s ease-out;
  position: relative;
  min-height: 50px;
  padding: 0 ${({ theme }) => theme.space.s10};
  -webkit-appearance: none;
  border: 1px solid;
  border-radius: 4px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${getButtonColor}
  ${margin}
`;

/* <Button />
============================================================================= */
Button.defaultProps = {
  color: 'blue',
};

export default Button;
