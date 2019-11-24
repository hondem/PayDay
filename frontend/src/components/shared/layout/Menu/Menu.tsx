import React, { PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';

import * as S from './Menu.styles';
import { X, Users } from 'react-feather';
import { Heading } from '../../typography';
import { Box } from '..';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

const MenuLink = withRouter(
  ({ router, children, ...props }: PropsWithChildren<LinkProps & WithRouterProps>) => {
    const isActive = router.pathname === props.href;

    return (
      <Link {...props}>
        <S.MenuLink isActive={isActive}>{children}</S.MenuLink>
      </Link>
    );
  },
);

/* Props - <Menu />
============================================================================= */
export type MenuProps = {
  isMenuOpen: boolean;
  onMenuClose: () => void;
};

/* <Menu />
============================================================================= */
const Menu: React.FunctionComponent<MenuProps> = ({ isMenuOpen, onMenuClose }) => {
  return (
    <S.Wrapper isMenuOpen={isMenuOpen}>
      <S.Header>
        <Heading as="h3" color="grays.1" mb="0">
          Menu
        </Heading>

        <S.CloseWrapper onClick={onMenuClose}>
          <X />
        </S.CloseWrapper>
      </S.Header>

      <S.Content>
        <S.MenuList>
          <S.MenuItem>
            <MenuLink href="/employees" passHref>
              <Users />
              <Box ml="s4">Zamestnanci</Box>
            </MenuLink>
          </S.MenuItem>
        </S.MenuList>
      </S.Content>
    </S.Wrapper>
  );
};

export default Menu;
