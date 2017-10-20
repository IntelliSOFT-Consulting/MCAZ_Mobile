import { createStore } from 'redux'
import reducer from '../reducers'

const pvStore = (state) => {
  return createStore(reducer, state)
}

export default pvStore
