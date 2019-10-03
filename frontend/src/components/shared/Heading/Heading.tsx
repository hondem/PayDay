import React from 'react';
import { HeadingStyled } from './Heading.styles';
import { SpaceProps } from 'styled-system';

/* Props - <Heading />
============================================================================= */
export type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  children: string;
} & SpaceProps;

/* <Heading />
============================================================================= */
const Heading: React.FunctionComponent<HeadingProps> = ({ children, ...props }) => {
  return <HeadingStyled {...props}>{children}</HeadingStyled>;
};

/* Default props - <Heading />
============================================================================= */
Heading.defaultProps = {
  as: 'h1',
  mb: 3
};

export default Heading;
