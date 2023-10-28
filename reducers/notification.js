import { SET_NOTIFICATION } from '../actions/actionTypes'
const notification = (state = null, action) => {
  switch(action.type) {
    case SET_NOTIFICATION:
      return Object.assign({}, state, action.notification);
    default:
      return state // The current status
  }
}

export default notification
