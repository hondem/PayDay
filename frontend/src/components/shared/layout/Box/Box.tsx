import styled from 'styled-components';
import {
  background,
  color,
  flexbox,
  layout,
  position,
  space,
  typography,
  compose,
} from 'styled-system';
import {
  BackgroundProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system';

export type BoxProps = BackgroundProps &
  ColorProps &
  FlexboxProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  TypographyProps;

/* <Box />
============================================================================= */
export const Box = styled.div<BoxProps>(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  compose(
    background,
    color,
    flexbox,
    layout,
    position,
    space,
    typography,
  ),
);
