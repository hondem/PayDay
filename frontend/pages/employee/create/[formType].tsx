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

/* Contants
============================================================================= */
const INITIAL_VALUES = {
  osobni: {
    meno: 'Jan',
    stredne_meno: 'APIGOD',
    priezvisko: 'Demel',
    rodne_cislo: 'Nepovym',
    datum_nar: '1998-05-20',
    pohlavie: 'M',
    statna_prislusnost: 'Čech',
    miesto_narodenia: 'Moravský Krumlov',
    stav: 'S',
    obciansky: 'Retardovany',
    pas: 'nemam',
  },
  firemni: {
    osobne_cislo: 'nepracuju',
    externe_osobne_cislo: 'nepracuju',
    aktivny: true,
    funkcia: 'Kávovar',
    pozicia: 'Kávovar',
    oddelenie: 'Sefuv rozkrok',
    pobocka: 'Kundovnice',
    stredisko: 'Rozkrok',
    nastup: '2000-01-01',
    ukoncenie: '2010-01-01',
    pozn: 'Umím polít kávou rozkrok',
  },
  adresa_trvale: {
    adresa_ulica_trvale: 'Most',
    adresa_cislo_popisne_trvale: '2015',
    adresa_cislo_domu_trvale: '190',
    psc_trvale: '74266',
    mesto_trvale: 'Ostrava',
    okres_trvale: 'Ostrava',
    kraj_trvale: 'Moravskoslezský',
    krajina_trvale: 'WTF',
  },
  adresa_prechodne: {
    adresa_ulica_prechodne: 'Neco',
    adresa_cislo_popisne_prechodne: '190',
    adresa_cislo_domu_prechodne: '160',
    psc_prechodne: '74221',
    mesto_prechodne: 'Brno',
    okres_prechodne: 'Brno',
    kraj_prechodne: 'Brno',
    krajina_prechodne: 'Brno',
  },
  kontakt: {
    telefon_pracovny: '7779796865',
    telefon_sukromny: '7779796865',
    telefon_iny: '777444555',
    skype: 'hondem',
    email: 'jandemel98@gmail.com',
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
  checkAuthorization(ctx);

  return { formType: ctx?.query?.formType };
};

export default connect(state => state)(EmployeeCreatePage);
