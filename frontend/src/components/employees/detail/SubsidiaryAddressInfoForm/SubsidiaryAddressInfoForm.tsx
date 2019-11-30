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
                  <Label htmlFor="adresa_ulica_prechodne">Ulica</Label>
                  <Input name="adresa_ulica_prechodne" />
                  <ErrorMessage name="adresa_ulica_prechodne" />
                </div>

                <div>
                  <Label htmlFor="adresa_cislo_popisne_prechodne">Popisné číslo</Label>
                  <Input name="adresa_cislo_popisne_prechodne" />
                  <ErrorMessage name="adresa_cislo_popisne_prechodne" />
                </div>

                <div>
                  <Label htmlFor="adresa_cislo_domu_prechodne">Číslo domu</Label>
                  <Input name="adresa_cislo_domu_prechodne" />
                  <ErrorMessage name="adresa_cislo_domu_prechodne" />
                </div>

                <div>
                  <Label htmlFor="psc_prechodne">PSČ</Label>
                  <Input name="psc_prechodne" />
                  <ErrorMessage name="psc_prechodne" />
                </div>

                <div>
                  <Label htmlFor="mesto_prechodne">Mesto</Label>
                  <Input name="mesto_prechodne" />
                  <ErrorMessage name="mesto_prechodne" />
                </div>

                <div>
                  <Label htmlFor="okres_prechodne">Okres</Label>
                  <Input name="okres_prechodne" />
                  <ErrorMessage name="okres_prechodne" />
                </div>

                <div>
                  <Label htmlFor="kraj_prechodne">Kraj</Label>
                  <Input name="kraj_prechodne" />
                  <ErrorMessage name="kraj_prechodne" />
                </div>

                <div>
                  <Label htmlFor="krajina_prechodne">Krajina</Label>
                  <Input name="krajina_prechodne" />
                  <ErrorMessage name="krajina_prechodne" />
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
