import { SAVE_UPLOADED_REPORT, REMOVE_UPLOADED_REPORT } from '../actions/actionTypes'
const uploaded = (state = [], action) => {
  switch(action.type) {
    case SAVE_UPLOADED_REPORT:
      var newReport = action.data
      if(state == null || drafts.length == 0) {
        return [...state, newReport]
      } else {
        const index = state.findIndex((report) => report.rid == newReport.rid )
        if(index == -1) {
          state.push(newReport)
        } else {
          state[i] = newReport
        }
      }
      return [...state]
    case REMOVE_UPLOADED_REPORT:
      const newReport = action.data
      if(state.length == 0){
        return state
      }
      return state.filter((report) => report.rid != newReport.rid)
    default:
      return state // The main page is the default page.

  }
}

export default uploaded
