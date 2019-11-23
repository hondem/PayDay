import { User } from '../types/auth';
import { AlertMessage } from '../types/common';

export type signInAction = {
  type: '[AUTH] SIGN_IN',
  payload: {
    email: string;
    password: string;
  }
}

export type signInSuccessAction = {
  type: '[AUTH] SIGN_IN_SUCCESS',
  payload: {
    user: User;
  }
}

export type signInFailureAction = {
  type: '[AUTH] SIGN_IN_FAILURE',
}

export type saveUserAction = {
  type: '[AUTH] SAVE_USER';
  payload: {
    user: User;
  };
};

export type setAlertMessageAction = {
  type: '[AUTH] SET_ALERT_MESSAGE',
  payload: {
    alertMessage: AlertMessage;
  }
}

type AuthAction = signInAction | signInSuccessAction | signInFailureAction | saveUserAction | setAlertMessageAction;

export default AuthAction;
