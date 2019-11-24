import styled from "styled-components";

/* <Box />
============================================================================= */
const Content = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.space.s6};
  margin-top: 60px;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-top: 80px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    padding: 0 ${({ theme }) => theme.space.s20};
  }
`;

export default Content;
