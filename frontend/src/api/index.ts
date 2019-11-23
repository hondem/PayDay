import { from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const COOKIE_ACCESS_TOKEN = 'accessToken';

/**
 * Handles native fetch response.
 *
 * @param res Response
 */
export const handleResponse = async (res: Response) => {
  if (res.ok) {
    if (res.status === 200) {
      try {
        const response = await res.json();
        return response;
      } catch (e) {
        return await Promise.resolve({});
      }
    }
    return Promise.resolve({});
  } else {
    if (typeof res.json === 'function') {
      const err = await res.json();
      throw { response: err, status: res.status, headers: res.headers };
    } else {
      throw { response: undefined, status: res.status, headers: res.headers };
    }
  }
};

/**
 * Handles redux-observable fetch response.
 *
 * @param res Response
 */
export const handleObservableResponse = (res: Response) => {
  if (res.ok) {
    if (res.status === 200) {
      return res.json();
    }
    return Promise.resolve({});
  } else {
    return from(res.json()).pipe(
      catchError(() => {
        throw { response: null, headers: res.headers };
      }),
      switchMap(x => {
        throw { response: x, headers: res.headers };
      }),
    );
  }
};
