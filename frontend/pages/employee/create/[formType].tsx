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
import { createEmployee } from '../../../src/api/client/companies';
import { selectUser } from '../../../src/selectors/auth';
import { AlertMessage } from '../../../src/types/common';
import { canCreateEmployee } from '../../../src/api/shared/auth';
import { User } from '../../../src/types/auth';

/* Contants
============================================================================= */
const INITIAL_VALUES = {
  osobni: {
    meno: '',
    stredne_meno: '',
    priezvisko: '',
    rodne_cislo: '',
    datum_nar: '',
    pohlavie: '',
    statna_prislusnost: '',
    miesto_narodenia: '',
    stav: '',
    obciansky: '',
    pas: '',
  },
  firemni: {
    osobne_cislo: '',
    externe_osobne_cislo: '',
    aktivny: true,
    funkcia: '',
    pozicia: '',
    oddelenie: '',
    pobocka: '',
    stredisko: '',
    nastup: '',
    ukoncenie: '',
    pozn: '',
  },
  adresa_trvale: {
    adresa_ulica_trvale: '',
    adresa_cislo_popisne_trvale: '',
    adresa_cislo_domu_trvale: '',
    psc_trvale: '',
    mesto_trvale: '',
    okres_trvale: '',
    kraj_trvale: '',
    krajina_trvale: '',
  },
  adresa_prechodne: {
    adresa_ulica_prechodne: '',
    adresa_cislo_popisne_prechodne: '',
    adresa_cislo_domu_prechodne: '',
    psc_prechodne: '',
    mesto_prechodne: '',
    okres_prechodne: '',
    kraj_prechodne: '',
    krajina_prechodne: '',
  },
  kontakt: {
    telefon_pracovny: '',
    telefon_sukromny: '',
    telefon_iny: '',
    skype: '',
    email: '',
  },
};

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
        <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
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
  const accessToken = checkAuthorization(ctx);

  const { user } = JwtDecode<{ user: User }>(accessToken);
  if (!canCreateEmployee(user)) {
    if (ctx.req) {
      ctx.res.writeHead(401, { Location: '/' });
      ctx.res.end();
      return;
    } else {
      Router.push('/');
      return;
    }
  }

  return { formType: ctx?.query?.formType };
};

export default connect(state => state)(EmployeeCreatePage);
