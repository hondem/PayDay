import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';

/* <Index />
============================================================================= */
const Index: NextPage = () => null;

/* getInitialProps - <Index />
============================================================================= */
Index.getInitialProps = async (ctx: NextPageContext): Promise<null> => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: `/employees/${ctx?.query?.id}/essential/personal` });
    ctx.res.end();
  } else {
    Router.push(
      '/employees/[id]/essential/[formType]',
      `/employees/${ctx?.query?.id}/essential/personal`,
    );
  }

  return null;
};

export default Index;
