import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

export function configureReduxStore(deps, epics, reducer) {
  const epicMiddleware = createEpicMiddleware(epics, {
    dependencies: {
      ...deps
    }
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(reducer,
    composeEnhancers(
      applyMiddleware(
        epicMiddleware
      )
    )
  )
}