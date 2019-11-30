import React, { PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';

import { X, Users } from 'react-feather';
import { Heading } from '../../typography';
import { Box } from '..';
import { withRouter, Router } from 'next/router';

import * as S from './Navigation.styles';

/* Props - <NavigationLink />
============================================================================= */
type NavigationLinkProps = {
  router: Router;
} & LinkProps;

/* <NavigationLink />
============================================================================= */
const NavigationLink = withRouter(
  ({ router, children, ...props }: PropsWithChildren<NavigationLinkProps>) => {
    const isActive = router.pathname === props.href;

    return (
      <Link {...props}>
        <S.NavigationLink isActive={isActive}>{children}</S.NavigationLink>
      </Link>
    );
  },
);

/* Props - <Navigation />
============================================================================= */
export type NavigationProps = {
  isNavigationOpen: boolean;
  onNavigationClose: () => void;
};

/* <Navigation />
============================================================================= */
const Navigation: React.FunctionComponent<NavigationProps> = ({ isNavigationOpen, onNavigationClose }) => {
  return (
    <>
      <S.Wrapper isNavigationOpen={isNavigationOpen}>
        <S.Header>
          <Heading as="h3" color="grays.1" mb="0">
            Menu
          </Heading>

          <S.CloseWrapper onClick={onNavigationClose}>
            <X />
          </S.CloseWrapper>
        </S.Header>

        <S.Content>
          <S.NavigationList>
            <S.NavigationItem>
              <NavigationLink href="/employees" passHref>
                <Users />
                <Box ml="s4">Zamestnanci</Box>
              </NavigationLink>
            </S.NavigationItem>
          </S.NavigationList>
        </S.Content>
      </S.Wrapper>

      <S.Overlay onClick={onNavigationClose} isNavigationOpen={isNavigationOpen} />
    </>
  );
};

export default Navigation;
