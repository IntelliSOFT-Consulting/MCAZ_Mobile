import { ARCHIVE_DATA, CLEAR_DATA } from '../actions/actionTypes'

const archived = (state = [], action) => {
  switch(action.type) {
    case CLEAR_DATA:
      return []
    case ARCHIVE_DATA:
      const newState = state.concat(action.data)
      return Object.assign([], newState)
    default:
      return state

  }
}

export default archived
