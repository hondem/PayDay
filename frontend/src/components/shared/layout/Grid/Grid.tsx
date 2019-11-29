import styled from 'styled-components';
import { GridProps, grid } from 'styled-system';

import { Box, BoxProps } from '..';

/* <Grid />
============================================================================= */
const Grid = styled(Box)<BoxProps & GridProps>({ display: 'grid' }, grid);

export default Grid;
