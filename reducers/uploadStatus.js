import { RESET_UPLOAD_STATUS, UPDATE_UPLOAD_STATUS } from '../actions/actionTypes'
const uploadStatus = (state = {}, action) => {
  switch(action.type) {
    case RESET_UPLOAD_STATUS:
      if(action.uploaded) {
        return Object.assign({}, { uploaded : action.uploaded })
      }
      return Object.assign({})
    case UPDATE_UPLOAD_STATUS:
      if(state.uploaded == null) { // when the number to be uploaded is null return state
        return state
      }
      const uploaded = (state.uploaded == null ? 0 : state.uploaded) - 1
      return Object.assign({}, status, { uploading : true }, { uploaded : uploaded })
    default:
      return state // The main page is the default page.

  }
}

export default uploadStatus
