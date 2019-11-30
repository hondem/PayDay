import { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { UserPlus } from 'react-feather';
import Router from 'next/router';
import { connect, useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { Formik, Form } from 'formik';
import JwtDecode from 'jwt-decode';

import { checkAuthorization } from '../../../src/next';
import {
  Header,
  Content,
  PageHeader,
  Panel,
  Grid,
  Flex,
} from '../../../src/components/shared/layout';
import { saveUserAction } from '../../../src/actions/auth';
import { AppState } from '../../../src/reducers';
import { Button, Alert } from '../../../src/components/shared/misc';
import { SideMenu, EssentialInfo } from '../../../src/components/employees';
import { deleteEmployee, updateEmployee, createEmployee } from '../../../src/api/client/companies';
import { selectUser } from '../../../src/selectors/auth';
import { getEmployee } from '../../../src/api/client/companies';
import { AlertMessage } from '../../../src/types/common';

/* Props - <EmployeeCreatePage />
============================================================================= */
type Props = {
  formType: string | string[];
};

/* <EmployeeCreatePage />
============================================================================= */
const EmployeeCreatePage: NextPage<Props> = ({ formType }) => {
  const [alertMessage, setAlertMessage] = useState<AlertMessage>(null);
  const user = useSelector(selectUser);

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

    await createEmployee(user.companyId, employeeOut)
      .then(({ data }) => {
        /* Show success message */
        setAlertMessage({ type: 'success', message: 'Zamestnanec úspešne vytvorený.' });

        setTimeout(() => {
          Router.push('/');
        }, 4000);
      })
      .catch(() => {
        /* Show error message */
        setAlertMessage({ type: 'error', message: 'Zamestnanca sa nepodarilo vytvoriť.' });
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
      <Head>
        <title>Nový zamestnanec - Payday</title>
      </Head>

      <Header />

      <Content isNarrow>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <PageHeader icon={<UserPlus />} title="Nový zamestnanec" subtitle="Zamestnanci">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Vytváraie nového zamstnanca...' : 'Vytvoriť nového zamestnanca'}
                </Button>
              </PageHeader>

              <Grid gridTemplateColumns={['auto', null, '300px auto']} gridGap="s6">
                <SideMenu />

                <Flex flexDirection="column">
                  {alertMessage && <Alert type={alertMessage.type}>{alertMessage.message}</Alert>}

                  <Panel title={resolveFormTypeTitle()}>
                    <EssentialInfo formType={formType} />
                  </Panel>
                </Flex>
              </Grid>
            </Form>
          )}
        </Formik>
      </Content>
    </>
  );
};

/* getInitialProps - <EmployeeCreatePage />
============================================================================= */
EmployeeCreatePage.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  checkAuthorization(ctx);

  return { formType: ctx?.query?.formType };
};

export default connect(state => state)(EmployeeCreatePage);
