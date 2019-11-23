import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import { ColorProps } from 'styled-system';
import { pick } from 'ramda';

import * as S from './Link.styles';

/* Props - <Link />
============================================================================= */
type Props = LinkProps & ColorProps;

/* <Link />
============================================================================= */
const Link: React.FunctionComponent<Props> = ({ children, ...props }) => {
  /* Separate color props */
  const colorProps = pick(['color', 'bg', 'backgroundColor', 'opacity'])(props);

  return (
    <NextLink {...props}>
      <S.Link {...colorProps}>{children}</S.Link>
    </NextLink>
  );
};

export default Link;
