import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';

import { checkAuthorization } from '../../src/next';

/* Props - <Employees />
============================================================================= */
type Props = {
  accessToken: string;
}

/* <Employees />
============================================================================= */
const Employees: NextPage<Props> = () => (
  <>
    <Head>
      <title>Payday - Zamestnanci</title>
    </Head>

    <span>Zamestnanci</span>
  </>
);

/* getInitialProps - <Employees />
============================================================================= */
Employees.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const accessToken = checkAuthorization(ctx);
  return { accessToken };
}

export default Employees;