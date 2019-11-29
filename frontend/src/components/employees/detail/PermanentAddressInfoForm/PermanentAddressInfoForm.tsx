import React, { useState } from 'react';
import { Formik, Form } from 'formik';

import { Grid, Box, Flex } from '../../../shared/layout';
import { Label, Input, ErrorMessage } from '../../../shared/forms';
import { Link, Button } from '../../../shared/misc';

/* Form data
============================================================================= */
type FormValues = {
  meno: string;
  priezvisko: string;
};

const INITIAL_VALUES: FormValues = {
  meno: '',
  priezvisko: '',
};

/* Props - <OtherInfoForm />
============================================================================= */
type Props = {};

/* <OtherInfoForm />
============================================================================= */
const OtherInfoForm: React.FunctionComponent<Props> = () => {
  const [initialValues, setInitialValues] = useState<FormValues>(INITIAL_VALUES);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={() => null}>
        {({ isSubmitting }) => (
          <>
            <Form>
              <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
                <div>
                  <Label htmlFor="adresa_ulica_trvale">Ulica</Label>
                  <Input name="adresa_ulica_trvale" />
                  <ErrorMessage name="adresa_ulica_trvale" />
                </div>

                <div>
                  <Label htmlFor="adresa_cislo_popisne_trvale">Popisné číslo</Label>
                  <Input name="adresa_cislo_popisne_trvale" />
                  <ErrorMessage name="adresa_cislo_popisne_trvale" />
                </div>

                <div>
                  <Label htmlFor="adresa_cislo_domu_trvale">Číslo domu</Label>
                  <Input name="adresa_cislo_domu_trvale" />
                  <ErrorMessage name="adresa_cislo_domu_trvale" />
                </div>

                <div>
                  <Label htmlFor="psc_trvale">PSČ</Label>
                  <Input name="psc_trvale" />
                  <ErrorMessage name="psc_trvale" />
                </div>

                <div>
                  <Label htmlFor="mesto_trvale">Mesto</Label>
                  <Input name="mesto_trvale" />
                  <ErrorMessage name="mesto_trvale" />
                </div>

                <div>
                  <Label htmlFor="okres_trvale">Okres</Label>
                  <Input name="okres_trvale" />
                  <ErrorMessage name="okres_trvale" />
                </div>

                <div>
                  <Label htmlFor="kraj_trvale">Kraj</Label>
                  <Input name="kraj_trvale" />
                  <ErrorMessage name="kraj_trvale" />
                </div>

                <div>
                  <Label htmlFor="krajina_trvale">Krajina</Label>
                  <Input name="krajina_trvale" />
                  <ErrorMessage name="krajina_trvale" />
                </div>
              </Grid>

              <Button type="submit" color="blue" disabled={isSubmitting}>
                {isSubmitting ? 'Ukladám...' : 'Uložiť'}
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

/* Default props - <OtherInfoForm />
============================================================================= */
OtherInfoForm.defaultProps = {};

export default OtherInfoForm;
