import { createStore, compose } from 'redux'
import {
  persistStore,
  persistCombineReducers, autoRehydrate
} from 'redux-persist'
import { AsyncStorage } from 'react-native'
import reducer from '../reducers'

const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true
};

const reducers = persistCombineReducers(config, {
  reducer,
});

const pvStore = (state) => {
  const store = createStore(reducers, state)
  const persistor = persistStore(store);

  return { persistor, store };
}

export default pvStore
