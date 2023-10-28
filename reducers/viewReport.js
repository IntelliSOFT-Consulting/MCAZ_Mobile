import { VIEW_REPORT } from '../actions/actionTypes'
const viewReport = (state = null, action) => {
  switch(action.type) {
    case VIEW_REPORT:
      return Object.assign({}, state, action.report);
    default:
      return state // The current status
  }
}

export default viewReport
