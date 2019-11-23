import React from 'react';

import Link from 'next/link';
import { Menu, LogOut } from 'react-feather';

import * as S from './Header.styles';
import { removeAuthToken } from '../../../../api/client';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { setAlertMessageAction } from '../../../../actions/auth';

/* <Header />
============================================================================= */
const Header: React.FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch<setAlertMessageAction>>();

  /* Handle click on sign out icon */
  const signOut = () => {
    /* Remove auth token cookie */
    removeAuthToken();

    /* Redirect to sign-in */
    Router.push('/sign-in');

    /* Show success message */
    dispatch({ type: '[AUTH] SET_ALERT_MESSAGE', payload: { alertMessage: {
      type: 'success',
      message: 'Odhlásenie bolo úspešné.'
    } } });
  }

  return (
    <S.Wrapper>
      <S.HeaderButton title="Menu">
        <Menu />
      </S.HeaderButton>

      <Link href="/" passHref>
        <S.Logo>Payday</S.Logo>
      </Link>

      <S.HeaderButton onClick={signOut} title="Odhlásiť" borderLeft>
        <LogOut/>
      </S.HeaderButton>
    </S.Wrapper>
  );
};

export default Header;
