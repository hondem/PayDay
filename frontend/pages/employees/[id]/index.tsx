import Head from 'next/head';
import { NextPage } from 'next';
import { Users } from 'react-feather';
import { connect } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';

import { checkAuthorization } from '../../../src/next';
import { Header, Content, PageHeader, Panel, Grid } from '../../../src/components/shared/layout';
import { saveUserAction } from '../../../src/actions/auth';
import { AppState } from '../../../src/reducers';
import { Button, ActiveLink } from '../../../src/components/shared/misc';
import { Menu, MenuItem, MenuLink } from '../../../src/components/shared/layout/Panel/modules/Menu';
import { PersonalInfoForm, SideMenu } from '../../../src/components/employees';

/* Props - <EmployeeDetail />
============================================================================= */
type Props = {
  accessToken: string;
};

/* <EmployeeDetail />
============================================================================= */
const EmployeeDetail: NextPage<Props> = () => (
  <>
    <Head>
      <title>John Kunda - Payday</title>
    </Head>

    <Header />

    <Content isNarrow>
      <PageHeader icon={<Users />} title="John Kunda" subtitle="Personalistika">
        <Button color="red">Zmazať zamestnanca</Button>
      </PageHeader>

      <Grid gridTemplateColumns={["auto", null, "300px auto"]} gridGap="s6">
        <SideMenu />

        <Panel title="Osobné informácie">
          <PersonalInfoForm />
        </Panel>
      </Grid>
    </Content>
  </>
);

/* getInitialProps - <EmployeeDetail />
============================================================================= */
EmployeeDetail.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  const accessToken = checkAuthorization(ctx);

  return { accessToken };
};

export default connect(state => state)(EmployeeDetail);
