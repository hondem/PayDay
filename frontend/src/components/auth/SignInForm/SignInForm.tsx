import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Flex, Box } from '../../shared/layout';
import { Link } from '../../shared/typography';
import { Input, Label, ErrorMessage } from '../../shared/forms';
import { Button } from '../../shared/misc';

/* Constants
============================================================================= */
const INITIAL_VALUES = {
  email: '',
  password: '',
};

/* <SignInForm />
============================================================================= */
const SignInForm: React.FunctionComponent = () => {
  const getValidationSchema = (): Yup.Schema<object> =>
    Yup.object().shape({
      email: Yup.string()
        .email('Prosím zadajte valídnu emailovú adresu (napr. jan.novak@email.sk).')
        .required('Prosím zadajte vašu emalovú adresu.'),
      password: Yup.string()
        .min(6, 'Heslo musí byť aspoň 6 znakov dlhé.')
        .required('Prosím zadate vaše heslo.'),
    });

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={getValidationSchema()}
        onSubmit={() => null}
      >
        {() => (
          <>
            <Box mb="s6">
              <Label htmlFor="email">Emailová adresa</Label>
              <Input type="email" name="email" autoFocus />
              <ErrorMessage name="email" />
            </Box>

            <Box mb="s6">
              <Label htmlFor="password">Heslo</Label>
              <Input type="password" name="password" />
              <ErrorMessage name="password" />
            </Box>

            <Flex alignItems="center" justifyContent="space-between">
              <Button type="submit" color="blue">
                Prihlásiť
              </Button>
              <Link href="/forgotten-password" color="grays.3">
                Zabudnuté heslo?
              </Link>
            </Flex>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
