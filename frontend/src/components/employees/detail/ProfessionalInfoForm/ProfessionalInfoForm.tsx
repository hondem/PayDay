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
                  <Label htmlFor="osobne_cislo">Obsobné číslo</Label>
                  <Input name="osobne_cislo" />
                  <ErrorMessage name="osobne_cislo" />
                </div>

                <div>
                  <Label htmlFor="nastup">Nástup</Label>
                  <Input name="nastup" />
                  <ErrorMessage name="nastup" />
                </div>

                <div>
                  <Label htmlFor="ukoncenie">Ukončenie</Label>
                  <Input name="ukoncenie" />
                  <ErrorMessage name="ukoncenie" />
                </div>

                <div>
                  <Label htmlFor="aktivny">Aktívny</Label>
                  <Input name="aktivny" />
                  <ErrorMessage name="aktivny" />
                </div>

                <div>
                  <Label htmlFor="externe_osobne_cislo">Externé číslo</Label>
                  <Input name="externe_osobne_cislo" />
                  <ErrorMessage name="externe_osobne_cislo" />
                </div>

                <div>
                  <Label htmlFor="funkcia">Funkcia</Label>
                  <Input name="funkcia" />
                  <ErrorMessage name="funkcia" />
                </div>

                <div>
                  <Label htmlFor="pozicia">Pozícia</Label>
                  <Input name="pozicia" />
                  <ErrorMessage name="pozicia" />
                </div>

                <div>
                  <Label htmlFor="oddelenie">Oddelenie</Label>
                  <Input name="oddelenie" />
                  <ErrorMessage name="oddelenie" />
                </div>

                <div>
                  <Label htmlFor="pobocka">Pobočka</Label>
                  <Input name="pobocka" />
                  <ErrorMessage name="pobocka" />
                </div>

                <div>
                  <Label htmlFor="stredisko">Stredisko</Label>
                  <Input name="stredisko" />
                  <ErrorMessage name="stredisko" />
                </div>

                <div>
                  <Label htmlFor="pozn">Poznámka</Label>
                  <Input name="pozn" />
                  <ErrorMessage name="pozn" />
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
