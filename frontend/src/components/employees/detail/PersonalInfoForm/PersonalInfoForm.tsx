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

/* Props - <PersonalInfoForm />
============================================================================= */
type Props = {};

/* <PersonalInfoForm />
============================================================================= */
const PersonalInfoForm: React.FunctionComponent<Props> = () => {
  const [initialValues, setInitialValues] = useState<FormValues>(INITIAL_VALUES);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={() => null}>
        {({ isSubmitting }) => (
          <>
            <Form>
              <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
                <div>
                  <Label htmlFor="meno">Meno</Label>
                  <Input name="meno" autoComplete="given-name" />
                  <ErrorMessage name="meno" />
                </div>

                <div>
                  <Label htmlFor="priezvisko">Priezvisko</Label>
                  <Input name="priezvisko" autoComplete="family-name" />
                  <ErrorMessage name="priezvisko" />
                </div>

                <div>
                  <Label htmlFor="stredne_meno">Stretné meno</Label>
                  <Input name="stredne_meno" autoComplete="additional-name" />
                  <ErrorMessage name="stredne_meno" />
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

/* Default props - <PersonalInfoForm />
============================================================================= */
PersonalInfoForm.defaultProps = {};

export default PersonalInfoForm;
