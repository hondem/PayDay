import styled from 'styled-components';
import { AnchorHTMLAttributes } from 'react';
import { color, ColorProps } from 'styled-system';

export const Link = styled.a<AnchorHTMLAttributes<HTMLAnchorElement> & ColorProps>`
  transition: all 0.2s ease-out;
  text-decoration: none;

  &:hover,
  &:focus {
    cursor: pointer;
    text-decoration: underline;
    outline: none;
  }

  ${color}
`;
