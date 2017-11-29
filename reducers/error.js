import { SAVE_ERROR } from '../actions/actionTypes'
const reportFilter = (state = null, action) => {
  switch(action.type) {
    case SAVE_ERROR:
      if(action.error) {
        return Object.assign({}, action.error)
      }
      return null
    default:
      return state // The main page is the default page.

  }
}

export default reportFilter
