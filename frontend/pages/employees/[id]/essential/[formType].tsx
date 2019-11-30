import { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Users } from 'react-feather';
import { connect, useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { Formik, Form } from 'formik';
import JwtDecode from 'jwt-decode';

import { checkAuthorization } from '../../../../src/next';
import { Header, Content, PageHeader, Panel, Grid } from '../../../../src/components/shared/layout';
import { saveUserAction } from '../../../../src/actions/auth';
import { AppState } from '../../../../src/reducers';
import { Button } from '../../../../src/components/shared/misc';
import {
  SideMenu,
  EssentialInfo,
} from '../../../../src/components/employees';
import { deleteEmployee, updateEmployee } from '../../../../src/api/client/companies';
import { selectUser } from '../../../../src/selectors/auth';
import { getEmployee } from '../../../../src/api/shared/employees';
import { User } from '../../../../src/types/auth';

/* Props - <EssentialInfoPage />
============================================================================= */
type Props = {
  employee: any;
  formType: string | string[];
};

/* <EssentialInfoPage />
============================================================================= */
const EssentialInfoPage: NextPage<Props> = ({ employee, formType }) => {
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);
  const user = useSelector(selectUser);

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

        await deleteEmployee(user.companyId, employee.id);
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

    await updateEmployee(user.companyId, employee.id, employeeOut).then(response => console.log(response));
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
        <title>
          {employee.osobni.meno} {employee.osobni.priezvisko} - Payday
        </title>
      </Head>

      <Header />

      <Content isNarrow>
        <Formik initialValues={employee} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <PageHeader
                icon={<Users />}
                title={`${employee.osobni.meno} ${employee.osobni.priezvisko}`}
                subtitle="Zamestnanci"
              >
                <Button type="button" mr="s6" color="blue">
                  Zložky
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

                <Panel title={resolveFormTypeTitle()}>
                  <EssentialInfo formType={formType} />
                </Panel>
              </Grid>
            </Form>
          )}
        </Formik>
      </Content>
    </>
  );
};

/* getInitialProps - <EssentialInfoPage />
============================================================================= */
EssentialInfoPage.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  const accessToken = checkAuthorization(ctx);
  let employee = null;

  if (accessToken) {
    const { user } = JwtDecode<{ user: User }>(accessToken);

    await getEmployee(ctx, user?.companyId, +ctx?.query?.id).then(({ data }) => {
      employee = data;
    });

    return { employee, formType: ctx?.query?.formType };
  }

  return { employee, formType: ctx?.query?.formType };
};

export default connect(state => state)(EssentialInfoPage);
