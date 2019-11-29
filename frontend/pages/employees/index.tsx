import Head from 'next/head';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Users } from 'react-feather';
import { connect } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';

import { checkAuthorization } from '../../src/next';
import { Header, Content, PageHeader } from '../../src/components/shared/layout';
import { saveUserAction } from '../../src/actions/auth';
import { AppState } from '../../src/reducers';
import { Button } from '../../src/components/shared/misc';

const EmployeeList = dynamic(
  () => import('../../src/components/employees').then(mod => mod.EmployeeList),
  { ssr: false },
);

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
      <title>Personalistika - Payday</title>
    </Head>

    <Header />

    <Content>
      <PageHeader icon={<Users />} title="Zoznam zamestnancov" subtitle="Personalistika">
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
