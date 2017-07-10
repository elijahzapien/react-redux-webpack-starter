import {
  applyMiddleware,
  compose,
  createStore as createReduxStore
} from 'redux';
import { createLogger as createLoggerMiddleware } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import EnvEnum from 'enums/EnvEnum';
import reducers from 'reducers';
import sagas from 'sagas';

const createStore = (initialState = {}) => {
  // Middleware
  const loggerMiddleware = createLoggerMiddleware();
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    sagaMiddleware,
    loggerMiddleware
  ];

  // Enhancers
  const enhancers = [];
  let composeEnhancers = compose;

  if (EnvEnum.DEVELOPMENT) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  // Store initiation
  const store = createReduxStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  let saga = sagaMiddleware.run(sagas);

  if (EnvEnum.DEVELOPMENT && module.hot) {
    module.hot.accept(
      './reducers',
      () => store.replaceReducer(reducers)
    );

    module.hot.accept(
      './sagas',
      () => {
        saga.cancel();

        saga.done.then(() => {
          saga = sagaMiddleware.run(sagas);
        });
      }
    );
  }

  return store;
};

export default createStore;
