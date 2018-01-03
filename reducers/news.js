import { SET_NEWS } from '../actions/actionTypes'

const news = (state = null, action) => {
  switch(action.type) {
    case SET_NEWS:
      if(action.news) {
        return action.news.site
      }
      return null
    default:
      return state // The default state.
  }
}

export default news
