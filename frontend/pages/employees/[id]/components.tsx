import ReactDOM from 'react-dom';
import Head from 'next/head';
import { NextPage } from 'next';
import { ChevronRight, Calendar as CalendarIcon, ChevronLeft } from 'react-feather';
import { connect } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { checkAuthorization } from '../../../src/next';
import { Header, Content, PageHeader, Panel, Flex } from '../../../src/components/shared/layout';
import { saveUserAction } from '../../../src/actions/auth';
import { AppState } from '../../../src/reducers';
import { Button } from '../../../src/components/shared/misc';

import { THEME } from '../../../src/theme';

/* Props - <Components />
============================================================================= */
type Props = {
  accessToken: string;
};

/* <Components />
============================================================================= */
const Components: NextPage<Props> = () => {
  moment.locale('sk');
  const localizer = momentLocalizer(moment);

  return (
    <>
      <Head>
        <title>Jack Kunda | Mzdové zložky - Payday</title>
      </Head>

      <Header />

      <Content>
        <PageHeader icon={<CalendarIcon />} title="Jack Kunda" subtitle="Mzdové zložky">
          <Button mr="s6">
            <ChevronLeft />
          </Button>

          <Button>
            <ChevronRight />
          </Button>
        </PageHeader>

          <Panel>
            <Calendar
              localizer={localizer}
              events={[]}
              startAccessor="start"
              endAccessor="end"
              views={['month']}
              toolbar={false}
              style={{ height: `calc(100vh - 300px)` }}
            />
          </Panel>
      </Content>
    </>
  );
};

/* getInitialProps - <Components />
============================================================================= */
Components.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  const accessToken = checkAuthorization(ctx);

  return { accessToken };
};

export default connect(state => state)(Components);
