import { LOGGED_IN, LOGOUT } from '../actions/actionTypes'
const token = (state = null, action) => {
  switch(action.type) {
    case LOGGED_IN:
      if(action.token) {
        return action.token
      }
      return state
    case LOGOUT:
      return null
    default:
      return state // The main page is the default page.
  }
}

export default token
