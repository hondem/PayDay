import Head from 'next/head';
import { NextPage } from 'next';

import { checkAuthorization } from '../../src/next';
import { Header } from '../../src/components/shared/layout';
import { connect } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { saveUserAction } from '../../src/actions/auth';
import { AppState } from '../../src/reducers';

/* Props - <Employees />
============================================================================= */
type Props = {
  accessToken: string;
};

/* <Employees />
============================================================================= */
const Employees: NextPage<Props> = () => (
  <>
    <Head>
      <title>Payday - Zamestnanci</title>
    </Head>

    <Header />
  </>
);

/* getInitialProps - <Employees />
============================================================================= */
Employees.getInitialProps = async (ctx: NextJSContext<AppState, saveUserAction>): Promise<Props> => {
  const accessToken = checkAuthorization(ctx);

  return { accessToken };
};

export default connect(state => state)(Employees);
