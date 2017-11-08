import { CHANGE_CONNECTION_STATUS } from '../actions/actionTypes'
const connection = (state = { isConnected : false }, action) => {
  switch(action.type) {
    case CHANGE_CONNECTION_STATUS:
      return Object.assign({}, state, {
        isConnected: action.isConnected,
      });
    default:
      return state // The current status
  }
}

export default connection
