import { SAVE_DRAFT_REPORT, REMOVE_DRAFT_REPORT } from '../actions/actionTypes'
const drafts = (state = [], action) => {
  switch(action.type) {
    case SAVE_DRAFT_REPORT:
      var newReport = action.data
      if(state == null || state.length == 0) {
        return [...state, newReport]
      } else {
        const index = state.findIndex((report) => report.rid == newReport.rid )
        if(index == -1) {
          state.push(newReport)
        } else {
          state[index] = newReport
        }
      }
      return [...state]
    case REMOVE_DRAFT_REPORT:
      if(state.length == 0){
        return state
      }
      return state.filter((report) => report.rid != action.data.rid)
    default:
      return state // The main page is the default page.
  }
}

export default drafts
