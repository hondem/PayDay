import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';

import { checkAuthorization } from '../../src/next';
import { Header } from '../../src/components/shared/layout';

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

    <Header>
      
    </Header>
  </>
);

/* getInitialProps - <Employees />
============================================================================= */
Employees.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const accessToken = checkAuthorization(ctx);
  return { accessToken };
}

export default Employees;