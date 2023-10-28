import { CURRENT_ROUTE } from '../actions/actionTypes'
const currentRoute = (state = null, action) => {
  switch(action.type) {
    case CURRENT_ROUTE:
      if(action.currentRoute) {
        return Object.assign({}, { name : action.currentRoute });
      }
      return state
    default:
      return state // The current status
  }
}

export default currentRoute
