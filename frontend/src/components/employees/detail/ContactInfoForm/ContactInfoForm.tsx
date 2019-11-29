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
                  <Label htmlFor="telefon_pracovny">Pracovný telefón</Label>
                  <Input name="telefon_pracovny" />
                  <ErrorMessage name="telefon_pracovny" />
                </div>

                <div>
                  <Label htmlFor="telefon_sukromny">Súkromný telefón</Label>
                  <Input name="telefon_sukromny" />
                  <ErrorMessage name="telefon_sukromny" />
                </div>

                <div>
                  <Label htmlFor="telefon_iny">Iný telefón</Label>
                  <Input name="telefon_iny" />
                  <ErrorMessage name="telefon_iny" />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" />
                  <ErrorMessage name="email" />
                </div>

                <div>
                  <Label htmlFor="skype">Skype</Label>
                  <Input name="skype" />
                  <ErrorMessage name="skype" />
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
