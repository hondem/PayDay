import Head from 'next/head';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Users } from 'react-feather';
import { connect } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';

import { checkAuthorization } from '../../src/next';
import { Header, Content, PageHeader, Flex } from '../../src/components/shared/layout';
import { saveUserAction } from '../../src/actions/auth';
import { AppState } from '../../src/reducers';
import { Button } from '../../src/components/shared/misc';
import { THEME } from '../../src/theme';
import { EmployeeList } from '../../src/components/employees';


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
      <title>Zamestnanci - Payday</title>
    </Head>

    <Header />

    <Content>
      <PageHeader icon={<Users />} title="Zoznam zamestnancov" subtitle="Zamestnanci">
        <Button>Vytvoriť nového zamestnanca</Button>
      </PageHeader>

      <EmployeeList />
    </Content>
  </>
);

/* getInitialProps - <Employees />
============================================================================= */
Employees.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  const accessToken = checkAuthorization(ctx);

  return { accessToken };
};

export default connect(state => state)(Employees);
