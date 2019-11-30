import { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Users } from 'react-feather';
import Router from 'next/router';
import { connect, useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { Formik, Form } from 'formik';

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
import { SideMenu, EssentialInfo } from '../../../../src/components/employees';
import { deleteEmployee, updateEmployee } from '../../../../src/api/client/companies';
import { selectUser } from '../../../../src/selectors/auth';
import { getEmployee } from '../../../../src/api/client/companies';
import { AlertMessage } from '../../../../src/types/common';

/* Props - <EssentialInfoPage />
============================================================================= */
type Props = {
  employeeId: number;
  formType: string | string[];
};

/* <EssentialInfoPage />
============================================================================= */
const EssentialInfoPage: NextPage<Props> = ({ employeeId, formType }) => {
  const [employee, setEmployee] = useState<any>(null);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    await getEmployee(user.companyId, employeeId).then(({ data }) => {
      setEmployee(data);
    });
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
      case 'personal': {
        return 'Osobné informácie';
      }
      case 'company': {
        return 'Firemné informácie';
      }
      case 'subsidiary_address': {
        return 'Trvalá adresa';
      }
      case 'permanent_address': {
        return 'Prechodná adresa';
      }
      case 'contact': {
        return 'Kontakt';
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

            <Formik initialValues={employee} onSubmit={handleSubmit}>
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
                        <EssentialInfo formType={formType} />
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

/* getInitialProps - <EssentialInfoPage />
============================================================================= */
EssentialInfoPage.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  checkAuthorization(ctx);

  return { employeeId: +ctx?.query?.id, formType: ctx?.query?.formType };
};

export default connect(state => state)(EssentialInfoPage);
