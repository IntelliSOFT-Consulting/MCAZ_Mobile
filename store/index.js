import { createStore, compose, applyMiddleware } from 'redux'
import {
  persistStore,
  persistCombineReducers, autoRehydrate
} from 'redux-persist'
import { AsyncStorage } from 'react-native'
import appState from '../reducers'
import thunk from 'redux-thunk'

const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true
};

const reducers = persistCombineReducers(config, {
  appState
});

const pvStore = (state) => {
  const store = createStore(reducers, state, applyMiddleware(thunk))
  const persistor = persistStore(store);

  return { persistor, store };
}

export default pvStore
