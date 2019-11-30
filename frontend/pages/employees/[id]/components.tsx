import { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { ChevronRight, Calendar as CalendarIcon, ChevronLeft } from 'react-feather';
import { connect, useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment, { Moment } from 'moment';
import Router from 'next/router';
import Loader from 'react-loader-spinner';

import { checkAuthorization } from '../../../src/next';
import { Header, Content, PageHeader, Panel, Flex } from '../../../src/components/shared/layout';
import { saveUserAction } from '../../../src/actions/auth';
import { AppState } from '../../../src/reducers';
import { Button } from '../../../src/components/shared/misc';
import Axios from 'axios';
import {
  getEmployee,
  getEmployeesComponents,
  createComponent,
} from '../../../src/api/client/companies';
import { selectUser } from '../../../src/selectors/auth';
import { THEME } from '../../../src/theme';

/* Props - <Components />
============================================================================= */
type Props = {
  employeeId: number;
};

/* <Components />
============================================================================= */
const Components: NextPage<Props> = ({ employeeId }) => {
  moment.locale('sk');
  const initialDate = moment();
  initialDate.set('date', 1);

  const [activeDate, setActiveDate] = useState<Moment>(initialDate);
  const [employee, setEmployee] = useState<any>(null);
  const [components, setComponents] = useState<any[]>(null);
  const localizer = momentLocalizer(moment);
  const user = useSelector(selectUser);

  useEffect(() => {
    getEmployee(user.companyId, employeeId).then(({ data: employee }) => {
      setEmployee(employee);
    });
  }, []);

  useEffect(() => {
    fetchComponents();
  }, [activeDate]);

  const fetchComponents = async () => {
    await getEmployeesComponents(user?.companyId, employeeId, activeDate.format('YYYY-MM-DD')).then(
      ({ data: components }) => {
        setComponents(components);
      },
    );
  };

  const handleSelect = ({ start, end }) => {
    const component = {
      kod: 5000,
      kod_ext: "test",
      datum_od: moment(start).format('YYYY-MM-DD'),
      datum_do: moment(end).format('YYYY-MM-DD'),
    };

    createComponent(user?.companyId, employeeId, component).then(() => {
      fetchComponents();
    });
  };

  return (
    <>
      <Header />

      <Content>
        {employee !== null && components !== null ? (
          <>
            <Head>
              <title>
                {employee.osobni.meno} {employee.osobni.priezvisko} | Mzdové zložky - Payday
              </title>
            </Head>
            <PageHeader
              icon={<CalendarIcon />}
              title={`${employee.osobni.meno} ${employee.osobni.priezvisko}`}
              subtitle="Mzdové zložky"
            >
              <Button
                onClick={() => {
                  Router.push(
                    '/employees/[id]/essential/personal',
                    `/employees/${employeeId}/essential/personal`,
                  );
                }}
                mr="s6"
              >
                Späť na profil zamestnanca
              </Button>
              <Button
                onClick={() => {
                  setActiveDate(moment(activeDate).subtract(1, 'month'));
                }}
                mr="s6"
              >
                <ChevronLeft />
              </Button>

              <span>{activeDate.format('MM/YYYY')}</span>

              <Button
                onClick={() => {
                  setActiveDate(moment(activeDate).add(1, 'month'));
                }}
                ml="s6"
              >
                <ChevronRight />
              </Button>
            </PageHeader>

            <Panel isPadded={false}>
              <Calendar
                selectable
                localizer={localizer}
                events={components.map(component => ({
                  title: component.pozn,
                  start: moment(component.datum_od, 'YYYY-MM-DD').toDate(),
                  end: moment(component.datum_do, 'YYYY-MM-DD').toDate(),
                  allDay: true,
                }))}
                startAccessor="start"
                endAccessor="end"
                views={['month']}
                toolbar={false}
                date={activeDate.toDate()}
                onNavigate={() => null}
                onSelectSlot={handleSelect}
                style={{ height: `calc(100vh - 260px)` }}
              />
            </Panel>
          </>
        ) : (
          <Flex justifyContent="center" pt="s10">
            <Loader type="Puff" color={THEME.colors.blues[1]} height={80} width={80} />
          </Flex>
        )}
      </Content>
    </>
  );
};

/* getInitialProps - <Components />
============================================================================= */
Components.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  checkAuthorization(ctx);

  return { employeeId: +ctx?.query?.id };
};

export default connect(state => state)(Components);
