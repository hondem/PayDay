import { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Users } from 'react-feather';
import { connect, useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { Formik, Form } from 'formik';
import Router from 'next/router';
import Axios from 'axios';
import moment from 'moment';

import { checkAuthorization } from '../../../../src/next';
import {
  Header,
  Content,
  PageHeader,
  Panel,
  Grid,
  Flex,
} from '../../../../src/components/shared/layout';
import { saveUserAction } from '../../../../src/actions/auth';
import { AppState } from '../../../../src/reducers';
import { Button, Alert } from '../../../../src/components/shared/misc';
import { SideMenu, WageInfo } from '../../../../src/components/employees';
import { deleteEmployee, updateEmployee, getWageData } from '../../../../src/api/client/companies';
import { selectUser } from '../../../../src/selectors/auth';
import { getEmployee } from '../../../../src/api/client/companies';
import { User } from '../../../../src/types/auth';
import { AlertMessage } from '../../../../src/types/common';
import { API } from '../../../../src/api';

/* Props - <WageInfoPage />
============================================================================= */
type Props = {
  employeeId: number;
  formType: string | string[];
};

/* <WageInfoPage />
============================================================================= */
const WageInfoPage: NextPage<Props> = ({ employeeId, formType }) => {
  const [employee, setEmployee] = useState<any>(null);
  const [wageData, setWageData] = useState<any>(null);
  const [wageMonth, setWageMonth] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Axios.all([
      getEmployee(user.companyId, employeeId),
      getWageData(user.companyId, employeeId, wageMonth),
    ]).then(
      Axios.spread(({ data: employee }, { data: wageData }) => {
        setEmployee(employee);
        setWageData([...wageData].pop());
      }),
    );
  };

  /**
   * Handles delete button click event.
   */
  const handleDelete = async () => {
    if (employee !== null) {
      let confirmation = confirm(
        `Určite chcete odstrániť zamestnanca "${employee.osobni.meno} ${employee.osobni.priezvisko}"?`,
      );

      if (confirmation) {
        setIsDeleteInProgress(true);

        await deleteEmployee(user.companyId, employee.id)
          .then(() => {
            /* Show success message */
            setAlertMessage({ type: 'success', message: 'Zamestnanec úspešne odstránený.' });

            setIsDeleteInProgress(false);

            setTimeout(() => {
              Router.push('/');
            }, 4000);
          })
          .catch(() => {
            /* Show success message */
            setAlertMessage({ type: 'success', message: 'Zamestnaneca sa nepodarilo odstrániť.' });

            setIsDeleteInProgress(false);
          });
      }
    }
  };

  /**
   * Handles save button click event.
   */
  const handleSubmit = async values => {
    const employeeOut = {
      ...values.osobni,
      ...values.firemni,
      ...values.adresa_trvale,
      ...values.adresa_prechodne,
      ...values.kontakt,
    };

    await updateEmployee(user.companyId, employee.id, employeeOut)
      .then(({ data }) => {
        setEmployee(data);

        /* Show success message */
        setAlertMessage({ type: 'success', message: 'Dáta boli úspešne aktualizované.' });
      })
      .catch(() => {
        /* Show error message */
        setAlertMessage({ type: 'error', message: 'Dáta sa nepodarilo aktualizovať.' });
      });
  };

  /**
   * Gets readable panel title from formType query.
   */
  const resolveFormTypeTitle = () => {
    switch (formType) {
      case 'employment': {
        return 'Pracovný pomer';
      }
      case 'tax': {
        return 'Dane';
      }
      case 'statistics': {
        return 'Štatistika';
      }
      case 'insurance': {
        return 'Poistenie';
      }
    }
  };

  return (
    <>
      <Header />

      <Content isNarrow>
        {employee !== null ? (
          <>
            <Head>
              <title>
                {employee.osobni.meno} {employee.osobni.priezvisko} - Payday
              </title>
            </Head>

            <Formik initialValues={wageData} onSubmit={handleSubmit} enableReinitialize>
              {({ isSubmitting }) => (
                <Form>
                  <PageHeader
                    icon={<Users />}
                    title={`${employee.osobni.meno} ${employee.osobni.priezvisko}`}
                    subtitle="Zamestnanci"
                  >
                    <Button
                      type="button"
                      onClick={() => {
                        Router.push(
                          '/employees/[id]/components',
                          `/employees/${employee?.id}/components`,
                        );
                      }}
                      mr="s6"
                      color="blue"
                    >
                      Mzdové zložky
                    </Button>

                    <Button
                      type="button"
                      onClick={handleDelete}
                      disabled={isDeleteInProgress}
                      color="red"
                      mr="s6"
                    >
                      {isDeleteInProgress ? 'Odstraňovanie...' : 'Odstrániť zamestnanca'}
                    </Button>

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Ukladanie...' : 'Uložiť'}
                    </Button>
                  </PageHeader>

                  <Grid gridTemplateColumns={['auto', null, '300px auto']} gridGap="s6">
                    <SideMenu employee={employee} />

                    <Flex flexDirection="column">
                      {alertMessage && (
                        <Alert type={alertMessage.type}>{alertMessage.message}</Alert>
                      )}

                      <Panel title={resolveFormTypeTitle()}>
                        <WageInfo formType={formType} />
                      </Panel>
                    </Flex>
                  </Grid>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <Flex justifyContent="center" pt="s10">
            Získavanie dát, prosím počkajte...
          </Flex>
        )}
        ;
      </Content>
    </>
  );
};

/* getInitialProps - <WageInfoPage />
============================================================================= */
WageInfoPage.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  checkAuthorization(ctx);

  return { employeeId: +ctx?.query?.id, formType: ctx?.query?.formType };
};

export default connect(state => state)(WageInfoPage);
