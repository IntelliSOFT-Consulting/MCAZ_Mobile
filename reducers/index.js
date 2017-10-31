import { combineReducers } from 'redux'
import drafts from './drafts'
import completed from './completed'
import uploaded from './uploaded'

const pvApp = combineReducers({ drafts, completed, uploaded })

export default pvApp
