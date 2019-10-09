import React from "react";
import { Formik, ErrorMessage } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import { Mail, Lock } from "react-feather";
import * as Yup from "yup";

import { Flex, Box } from "../../../shared/layout";
import { Heading, Paragraph, Link } from "../../../shared/typography";
import * as S from "../auth.styles";
import { Input, Label } from "../../../shared/forms";
import { Button } from "../../../shared/misc";

/* <SignUp />
============================================================================= */
const SignUp: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();

  return (
    <S.Wrapper>
      <S.FeatureImage />

      <Flex flex={5} flexDirection="column" justifyContent="center">
        <S.Form>
          <Box mb={6}>
            <Heading>
              <FormattedMessage id="auth.signUp.title" />
            </Heading>
            <Paragraph>
              <FormattedMessage id="auth.signUp.subtitle" />
            </Paragraph>
          </Box>
            <S.Separator />

          <Flex flexDirection="column" alignItems="center">
              <Link href="/sign-in">
                <FormattedMessage id="auth.signUp.signInCTA" />
              </Link>
          </Flex>
        </S.Form>
      </Flex>
    </S.Wrapper>
  );
};

export default SignUp;
