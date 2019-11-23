import { ofType, Epic } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import Router from 'next/router';

import AuthAction, {
  signInAction,
  signInSuccessAction,
  saveUserAction,
  setAlertMessageAction,
  signInFailureAction,
} from '../actions/auth';
import { signIn } from '../api/client/auth';
import { handleObservableResponse } from '../api';
import { setAuthToken } from '../api/client';
import { User } from '../types/auth';

const signInEpic: Epic<AuthAction, signInSuccessAction | signInFailureAction> = action$ =>
  action$.pipe(
    ofType<signInAction>('[AUTH] SIGN_IN'),
    switchMap(({ payload: { email, password } }) =>
      from(signIn(email, password)).pipe(
        switchMap(handleObservableResponse),
        map<User, signInSuccessAction>(user => {
          setAuthToken(user.accessToken);

          return { type: '[AUTH] SIGN_IN_SUCCESS', payload: { user } };
        }),
        catchError(() => of<signInFailureAction>({ type: '[AUTH] SIGN_IN_FAILURE' })),
      ),
    ),
  );

const signInSuccessEpic: Epic<AuthAction, saveUserAction | setAlertMessageAction> = action$ =>
  action$.pipe(
    ofType<signInSuccessAction>('[AUTH] SIGN_IN_SUCCESS'),
    switchMap(({ payload: { user } }) => {
      Router.push('/');

      return of<saveUserAction, setAlertMessageAction>(
        { type: '[AUTH] SAVE_USER', payload: { user } },
        {
          type: '[AUTH] SET_ALERT_MESSAGE',
          payload: {
            alertMessage: {
              type: 'success',
              message: 'Prihlásenie bolo úspešné.',
            },
          },
        },
      );
    }),
  );

const signInFailureEpic: Epic<AuthAction, setAlertMessageAction> = action$ =>
  action$.pipe(
    ofType<signInFailureAction>('[AUTH] SIGN_IN_FAILURE'),
    map<never, setAlertMessageAction>(() => ({
      type: '[AUTH] SET_ALERT_MESSAGE',
      payload: {
        alertMessage: {
          type: 'error',
          message: 'Prihlásenie bolo neúspešné.',
        },
      },
    })),
  );

export default [signInEpic, signInSuccessEpic, signInFailureEpic];
