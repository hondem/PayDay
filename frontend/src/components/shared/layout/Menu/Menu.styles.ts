import styled, { css } from 'styled-components';

import { MenuProps } from './Menu';

export const Wrapper = styled.div<Pick<MenuProps, 'isMenuOpen'>>`
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background: white;
  box-shadow: 8px 0 25px -15px ${({ theme }) => theme.colors.grays[1]};

  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 300px;
  }

  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      transform: translateX(0);
    `};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 60px;
  padding: 0 ${({ theme }) => theme.space.s6};
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 80px;
  }
`;

export const CloseWrapper = styled.button`
  appearance: none;
  background: none;
  border: none;

  &:focus,
  &:hover {
    cursor: pointer;
    outline: none;

    svg {
      color: ${({ theme }) => theme.colors.blues[1]};
    }
  }

  svg {
    transition: color 0.2s ease-out;
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.grays[1]};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 22px;
      height: 22px;
    }
  }
`;

export const Content = styled.div`
  flex: 1;
  width: 100%;
`;

export const MenuList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  display: flex;
  width: 100%;
  padding: 0 ${({ theme }) => theme.space.s6};
  margin-bottom: ${({ theme }) => theme.space.s6};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const MenuLink = styled.a<{ isActive: boolean }>`
  transition: color 0.2s ease-out;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grays[2]};
  font-weight: bold;
  text-decoration: none;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.colors.blues[1]};
    `}

  &:hover {
    color: ${({ theme }) => theme.colors.blues[1]};
  }
`;

export const Overlay = styled.div<Pick<MenuProps, 'isMenuOpen'>>`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1900;

  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      display: block;
    `}
`;
