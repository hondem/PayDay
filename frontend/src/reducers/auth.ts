import { assoc } from 'ramda';

import { User } from '../types/auth';
import AuthAction from '../actions/auth';
import { AlertMessage } from '../types/common';

/* Type
============================================================================= */
export type AuthState = {
  user: User;
  alertMessage: AlertMessage;
  isInProgress: boolean;
};

/* Initial state
============================================================================= */
const initialState: AuthState = {
  user: null,
  alertMessage: null,
  isInProgress: false,
};

/* Reducer
============================================================================= */
export default (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case '[AUTH] SIGN_IN': {
      return assoc('isInProgress', true)(state);
    }

    case '[AUTH] SIGN_IN_SUCCESS':
    case '[AUTH] SIGN_IN_FAILURE': {
      return assoc('isInProgress', false)(state);
    }

    case '[AUTH] SAVE_USER': {
      const { user } = action.payload;

      return assoc('user', user)(state);
    }

    case '[AUTH] SET_ALERT_MESSAGE': {
      const { alertMessage } = action.payload;

      return assoc('alertMessage', alertMessage)(state);
    }

    default:
      return state;
  }
};
