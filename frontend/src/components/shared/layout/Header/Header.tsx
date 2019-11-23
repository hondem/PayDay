import React from 'react';

import * as S from './Header.styles';
import Link from 'next/link';
import { Menu, User, LogOut } from 'react-feather';

/* <Header />
============================================================================= */
const Header: React.FunctionComponent = () => {
  return (
    <S.Wrapper>
      <S.HeaderButton>
        <Menu />
      </S.HeaderButton>

      <Link href="/" passHref>
        <S.Logo>Payday</S.Logo>
      </Link>

      <S.HeaderButton borderLeft>
        <LogOut/>
      </S.HeaderButton>
    </S.Wrapper>
  );
};

export default Header;
