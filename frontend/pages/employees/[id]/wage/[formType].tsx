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
import Loader from 'react-loader-spinner';

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
import { deleteEmployee, getWageData, createWageData } from '../../../../src/api/client/companies';
import { selectUser } from '../../../../src/selectors/auth';
import { getEmployee } from '../../../../src/api/client/companies';
import { AlertMessage } from '../../../../src/types/common';
import { THEME } from '../../../../src/theme';

/* Constants
============================================================================= */
const INITIAL_DATA = {
  platnost_od: '',
  druh: '',
  trieda: '',
  pracovna_doba_typ: '',
  kalendar_typ: '',
  uvazok: '',
  vypocet_sviatkov: '',
  pracovny_pomer_nad_5dni: false,
  pracovna_schopnost_znizena1: false,
  pracovna_schopnost_znizena2: false,
  pracovna_schopnost_znizena3: false,
  pracovna_kategoria: '',
  staticticky_udaj: '',
  specialna_kategoria: '',
  dochodca: false,
  dochodok_typ: '',
  pocet_deti: '',
  pocet_deti_do_6: '',
  danovy_odpocet_manzelka: false,
  danovy_bonus: false,
  nezdanitelne_min: false,
  zdravotna_poistovna: '',
  zc_zp: false,
  zc_sp_dp: false,
  zc_sp_np: false,
  zc_sp_pvn: false,
  zl_zp: false,
  zl_sp_dp: false,
  zl_sp_np: false,
  zl_sp_pvn: false,
  odbory: '',
};

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
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getEmployee(user.companyId, employeeId).then(({ data: employee }) =>
      setEmployee(employee),
    );

    await getWageData(
      user.companyId,
      employeeId,
      moment().format('YYYY-MM-DD'),
    ).then(({ data: wageData }) => setWageData(wageData));
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
  const handleSubmit = async ({ id, ...values }) => {
    const wageDataOut = {
      platnost_od: moment().format('YYYY-MM-DD'),
      ...values,
    };

    await createWageData(user.companyId, employee.id, wageDataOut)
      .then(({ data }) => {
        setWageData(data);

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

            <Formik initialValues={wageData ?? INITIAL_DATA} onSubmit={handleSubmit} enableReinitialize>
              {({ isSubmitting }) => (
                <Form>
                  <PageHeader
                    icon={<Users />}
                    title={`${employee.osobni.meno} ${employee.osobni.priezvisko}`}
                    subtitle="Mzdové údaje"
                  >
                    <Button
                      type="button"
                      onClick={() => {
                        Router.push(
                          '/employees/[id]/components',
                          `/employees/${employee?.id}/components`,
                        );
                      }}
                      color="white"
                    >
                      Mzdové zložky
                    </Button>

                    <Button
                      type="button"
                      onClick={handleDelete}
                      disabled={isDeleteInProgress}
                      color="red"
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
            <Loader type="Puff" color={THEME.colors.blues[1]} height={80} width={80} />
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
