// No need to combine reducers here, done at the store.
import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import drafts from './drafts'
import completed from './completed'
import uploaded from './uploaded'
import reportFilter from './reportFilter'
import connection from './connection'
import uploadStatus from './uploadStatus'
import notification from './notification'
import user from './user'
import viewReport from './viewReport'
import currentRoute from './currentRoute'
import news from './news'
import archived from './archived'
import loading from './loading';

const reducers = combineReducers({ drafts, completed, uploaded, reportFilter, connection, uploadStatus, notification, user, viewReport, currentRoute, news, archived, loading })

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
  blacklist: ['loading']
};

export default persistReducer(rootPersistConfig, reducers);
