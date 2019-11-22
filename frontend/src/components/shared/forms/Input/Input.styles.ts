import styled, { css } from 'styled-components';
import { InputHTMLAttributes } from 'react';
import { MarginProps, margin } from 'styled-system';

export const InputWrapper = styled.div<{ hasError: boolean } & MarginProps>`
  transition: all 0.2s ease-out;
  display: flex;
  position: relative;
  width: 100%;
  min-height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.grays[0]};
  border-radius: 4px;
  box-sizing: border-box;

  ${margin}
`;

export const InputIconWrapper = styled.div<{ hasError: boolean }>`
  transform: translateY(-50%);
  display: bloeck;
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.space.s4};
  width: 20px;
  height: 20px;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.grays[0]};

    ${({ hasError }) =>
      hasError &&
      css`
        color: ${({ theme }) => theme.colors.reds[1]};
      `}
  }
`;

export const Input = styled.input<{ hasError: boolean } & InputHTMLAttributes<HTMLInputElement>>`
  transition: all 0.2s ease-out;
  flex: 1;
  width: 100%;
  min-height: 50px;
  padding: 0 ${({ theme }) => theme.space.s4};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grays[3]};
  border: none;
  border-radius: 4px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.blues[1]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blues[1]};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grays[1]};
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${({ theme }) => theme.colors.reds[1]};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.reds[1]};
    `}}
`;

// export const CheckboxWrapper = styled.label<MarginProps>`
//   position: relative;
//   width: 22px;
//   height: 22px;

//   ${margin}
// `;

// export const CheckboxInput = styled.input<InputHTMLAttributes<HTMLInputElement>>`
//   position: absolute;
//   opacity: 0;
//   height: 0;
//   width: 0;

//   &:focus + span {
//     border-color: ${({ theme }) => theme.colors.blues[2]};
//     box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blues[2]};
//   }
// `;

// export const CheckboxCheckmark = styled.span<{ hasError: boolean; checked: boolean }>`
//   transition: all 200ms;
//   transform: translateY(-50%);
//   position: absolute;
//   top: 50%;
//   left: 0;
//   height: 22px;
//   width: 22px;
//   background: white;
//   border: 1px solid ${({ theme }) => theme.colors.grays[2]};

//   ${({ hasError }) => {
//     if (hasError) {
//       return css`
//         border-color: ${({ theme }) => theme.colors.reds[2]} !important;
//         box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.reds[2]} !important;
//       `;
//     }
//   }}

//   &::after {
//     content: '';
//     display: ${({ checked }) => (checked ? 'block' : 'none')};
//     transform: translateX(-50%) translateY(-60%) rotate(45deg);
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     width: 6px;
//     height: 12px;
//     border-right: 3px solid #2e7de1;
//     border-bottom: 3px solid #2e7de1;
//   }
// `;

// export const CheckboxLabel = styled.span`
//   user-select: none;
// `;