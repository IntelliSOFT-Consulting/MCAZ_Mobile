import { SAVE_ADR } from '../actions/actionTypes'
const AdrReport = (state = [], action) => {
  switch(action.type) {
    case SAVE_ADR:
      return Object.assign({}, state, state.push(action.data))
    default:
      return state // The main page is the default page.

  }
}

export default AdrReport
