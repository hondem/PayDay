import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import Router from 'next/router';

export const checkAuthorization = (ctx: NextPageContext): string => {
  const { accessToken } = parseCookies(ctx);

  if (!accessToken) {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: '/sign-in' });
      ctx.res.end();
      return;
    } else {
      Router.push('/sign-in');
      return;
    }
  }

  return accessToken;
};
