import { LOADING } from '../actions/actionTypes'

const INITIAL_STATE = { loading: false, message: '' };

const loading = (state = INITIAL_STATE, action) => {

  switch(action.type) {
    case LOADING.SET_LOADING:
      if (action.loading) {
        const newState = {...state};
        if (action.loading.message) {
          newState.message = action.loading.message
        }
        if (action.loading.loading != null) {
          newState.loading = action.loading.loading
        }
        return newState;
      }
      return action.loading;
    default:
      return state // The main page is the default page.

  }
}

export default loading
