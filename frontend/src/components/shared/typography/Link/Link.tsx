import React, { AnchorHTMLAttributes } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ColorProps } from 'styled-system';

import * as S from './Link.styles';

/* <Link />
============================================================================= */
const Link: React.FunctionComponent<NextLinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & ColorProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  passHref,
  ...props
}) => (
  <NextLink
    href={href}
    as={as}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    prefetch={prefetch}
    passHref={passHref}
  >
    <S.Link {...props}>{children}</S.Link>
  </NextLink>
);

/* Default props - <Link />
============================================================================= */
Link.defaultProps = {
  passHref: true,
  color: 'blues.1'
};

export default Link;
