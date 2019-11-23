import { createStore, compose, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers';
import rootEpic from './epics';

export default (initialState = {}) => {
  const epicMiddleware = createEpicMiddleware();

	const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(rootEpic);

  return store;
};
