import { LOGGED_IN, LOGOUT } from '../actions/actionTypes'
const token = (state = {}, action) => {
  switch(action.type) {
    case LOGGED_IN:
      if(action.user) {
        return action.user
      }
      return state
    case LOGOUT:
      if(state.token != null) {
        state.token = null
        return Object.assign({}, state)
      }
      return state
    default:
      if(state == null) {
        return {}
      }
      return state // The main page is the default page.
  }
}

export default token
