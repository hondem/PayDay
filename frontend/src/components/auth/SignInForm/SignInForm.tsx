import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Router from 'next/router';
import * as Yup from 'yup';
import to from 'await-to-js';

import { Flex, Box } from '../../shared/layout';
import { Input, Label, ErrorMessage } from '../../shared/forms';
import { Button, Alert, Link } from '../../shared/misc';
import { signIn } from '../../../api/auth';
import { handleResponse, setAuthToken } from '../../../api';
import { AlertMessage } from '../../../types/common';
import { User } from '../../../types/auth';

/* Form data
============================================================================= */
type FormValues = {
  email: string;
  password: string;
};

const INITIAL_VALUES: FormValues = {
  email: '',
  password: '',
};

/* <SignInForm />
============================================================================= */
const SignInForm: React.FunctionComponent = () => {
  const [alertMessage, setAlertMessage] = useState<AlertMessage>(undefined);

  const getValidationSchema = (): Yup.Schema<object> =>
    Yup.object().shape({
      email: Yup.string()
        .email('Prosím zadajte valídnu emailovú adresu (napr. novak@email.sk).')
        .required('Prosím zadajte vašu emalovú adresu.'),
      password: Yup.string()
        .min(6, 'Heslo musí byť aspoň 6 znakov dlhé.')
        .required('Prosím zadate vaše heslo.'),
    });

  const handleSubmit = async ({ email, password }: FormValues) => {
    /* Clear alert message */
    setAlertMessage(undefined);

    /* Try to sign in user */
    const [error, user] = await to<User>(signIn(email, password).then(handleResponse));
    if (user && !error) {
      setAuthToken(user.accessToken);
      setAlertMessage({type: 'success', message: 'Prihlásenie bolo úspešné. Prosím počkajte na presmerovanie.'})
      Router.push('/employees');
    } else {
      setAlertMessage({type: 'error', message: 'Prihlásenie bolo neúspešné.'})
    }
  };

  return (
    <>
      {alertMessage && <Alert type={alertMessage.type} mb="s8">{alertMessage.message}</Alert>}

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <>
            <Form>
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

              <Flex flex={1} alignItems="center" justifyContent="space-between">
                <Button type="submit" color="blue" disabled={isSubmitting}>
                  {isSubmitting ? 'Prihlasovanie...' : 'Prihlásiť'}
                </Button>
                <Link href="/forgotten-password" color="grays.3">
                  Zabudnuté heslo?
                </Link>
              </Flex>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
