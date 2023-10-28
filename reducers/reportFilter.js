import { SET_REPORT_FILTER } from '../actions/actionTypes'
const reportFilter = (state = { type : null }, action) => {
  switch(action.type) {
    case SET_REPORT_FILTER:
      return Object.assign({}, { type : action.filter })
    default:
      return state // The main page is the default page.

  }
}

export default reportFilter
