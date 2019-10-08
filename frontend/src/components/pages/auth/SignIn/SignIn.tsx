import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { Mail, Lock } from 'react-feather';
import * as Yup from 'yup';

import { Flex, Box } from '../../../shared/layout';
import { Heading, Paragraph, Link } from '../../../shared/typography';
import * as S from '../auth.styles';
import { Input, Label } from '../../../shared/forms';
import { Button } from '../../../shared/misc';

/* Constants
============================================================================= */
const INITIAL_VALUES = {
  email: '',
  password: '',
};

/* <SignIn />
============================================================================= */
const SignIn: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();

  const getValidationSchema = (): Yup.Schema<object> =>
    Yup.object().shape({
      email: Yup.string()
        .email(formatMessage({ id: 'messages.forms.validEmail' }))
        .required(formatMessage({ id: 'messages.forms.required' })),
      password: Yup.string()
        .min(6, formatMessage({ id: 'messages.forms.min' }, { min: 6 }))
        .required(formatMessage({ id: 'messages.forms.required' })),
    });

  return (
    <S.Wrapper>
      <S.FeatureImage />

      <Flex flex={5} flexDirection="column" justifyContent="center">
        <S.Form>
          <Box mb={6}>
            <Heading>
              <FormattedMessage id="auth.signIn.title" />
            </Heading>
            <Paragraph>
              <FormattedMessage id="auth.signIn.subtitle" />
            </Paragraph>
          </Box>

          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={getValidationSchema()}
            onSubmit={() => null}
          >
            {() => (
              <>
                <Box mb={5}>
                  <Label htmlFor="email">
                    <FormattedMessage id="common.email" />
                  </Label>
                  <Input type="email" name="email" icon={<Mail />} autoFocus />
                  <ErrorMessage
                    name="email"
                    render={message => (
                      <Paragraph color="reds.1" fontSize="13px" mb={0} mt={2}>
                        {message}
                      </Paragraph>
                    )}
                  />
                </Box>

                <Box mb={6}>
                  <Label htmlFor="password">
                    <FormattedMessage id="common.password" />
                  </Label>
                  <Input type="password" name="password" icon={<Lock />} />
                  <ErrorMessage
                    name="password"
                    render={message => (
                      <Paragraph color="reds.1" fontSize="13px" mb={0} mt={2}>
                        {message}
                      </Paragraph>
                    )}
                  />
                </Box>

                <Flex alignItems="center" justifyContent="space-between">
                  <Button type="submit" color="blue">
                    <FormattedMessage id="auth.signIn.signInButton" />
                  </Button>
                  <Link href="/forgotten-password" color="grays.3">
                    <FormattedMessage id="auth.signIn.forgottenPassword" />
                  </Link>
                </Flex>
              </>
            )}
          </Formik>

          <Flex flexDirection="column" alignItems="center">
            <S.Separator />

            <span>
              <FormattedMessage id="auth.signIn.noAccountQuestion" />
              &nbsp;
              <Link href="/sign-up">
                <FormattedMessage id="auth.signIn.signUpCTA" />
              </Link>
            </span>
          </Flex>
        </S.Form>
      </Flex>
    </S.Wrapper>
  );
};

export default SignIn;
