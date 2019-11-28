import { createSelector } from 'reselect';

import { AppState } from '../reducers';
import { AuthState } from '../reducers/auth';

export const getAuthState = (state: AppState): AuthState => state.auth;

export const selectAlertMessage = createSelector(
	getAuthState,
	state => state.alertMessage,
);