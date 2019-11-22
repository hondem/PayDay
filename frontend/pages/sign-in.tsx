import Head from 'next/head';

import { Heading, Paragraph, Link } from '../src/components/shared/typography';
import { Flex, Box } from '../src/components/shared/layout';

import * as S from '../src/components/auth/auth.styles';
import SignInForm from '../src/components/auth/SignInForm/SignInForm';

export default () => (
  <>
    <Head>
      <title>Payday - Prihlásenie</title>
    </Head>

    <S.Wrapper>
      <S.Form>
        <Box mb="s16">
          <Heading textAlign="center">Payday - Prihlásenie</Heading>
          <Paragraph textAlign="center">Pre prihlásenie zadajte svoj email a heslo.</Paragraph>
        </Box>

        <SignInForm />

        <Flex flexDirection="column" alignItems="center">
          <S.Separator />

          <Paragraph>
            Nemáte ešte účet? <Link href="/sign-up">Vytvorte si ho teraz!</Link>
          </Paragraph>
        </Flex>
      </S.Form>
    </S.Wrapper>
  </>
);
