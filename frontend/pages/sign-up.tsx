import Head from 'next/head';

import { Heading, Paragraph, Link } from '../src/components/shared/typography';
import { Flex, Box } from '../src/components/shared/layout';

import * as S from '../src/components/auth/auth.styles';

export default () => (
  <>
    <Head>
      <title>Payday - Sign in</title>
    </Head>

    <S.Wrapper>
      <S.Form>
        <Heading textAlign="center">Payday - Registrácia</Heading>
        <Paragraph textAlign="center">Pre registráciu kontaktujte administrátora:</Paragraph>
        <Paragraph fontWeight="bold" textAlign="center">
          xkorec04@stud.fit.vutbr.cz
        </Paragraph>
        <S.Separator />

        <Paragraph textAlign="center">
          Už máte vytvorený účet? <Link href="/sign-in">Prihlásenie</Link>
        </Paragraph>
      </S.Form>
    </S.Wrapper>
  </>
);
