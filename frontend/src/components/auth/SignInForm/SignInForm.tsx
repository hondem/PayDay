import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Flex, Box } from '../../shared/layout';
import { Input, Label, ErrorMessage } from '../../shared/forms';
import { Button, Alert, Link } from '../../shared/misc';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { signInAction, setAlertMessageAction } from '../../../actions/auth';
import { selectAuthAlertMessage } from '../../../selectors/auth';

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
  const alertMessage = useSelector(selectAuthAlertMessage);
  const dispatch = useDispatch<Dispatch<setAlertMessageAction | signInAction>>();

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
    dispatch({ type: '[AUTH] SET_ALERT_MESSAGE', payload: { alertMessage: null } });
    dispatch({ type: '[AUTH] SIGN_IN', payload: { email, password } });
  };

  return (
    <>
      {alertMessage && (
        <Alert type={alertMessage.type} mb="s8">
          {alertMessage.message}
        </Alert>
      )}

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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
                <Link href="/forgotten-password" color="grays.1">
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
