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
                  <Label htmlFor="meno">Meno</Label>
                  <Input name="meno" autoComplete="given-name" />
                  <ErrorMessage name="meno" />
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
