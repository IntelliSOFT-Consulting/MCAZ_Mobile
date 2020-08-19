import { createStore, applyMiddleware } from 'redux'
import {
  persistStore,
} from 'redux-persist'
import rootReducers from '../reducers'
import { storeMiddleWare } from '../middleware';
import thunk from 'redux-thunk'

const middlewares = [
  thunk,
  storeMiddleWare,
];

export const configureStore = () => {
  const store = createStore(rootReducers, {}, applyMiddleware(...middlewares));
  return { store, persistedStore: persistStore(store) };
};

/*const pvStore = (state) => {
  const store = createStore(reducers, state, applyMiddleware(thunk))
  const persistor = persistStore(store);

  return { persistor, store };
}

export default pvStore*/
