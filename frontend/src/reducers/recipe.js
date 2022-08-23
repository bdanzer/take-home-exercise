import {
  GET_RECIPE_SEARCH,
  RECEIVE_RECIPE_SEARCH,
  FAIL_RECIPE_SEARCH,
} from "../actions"

const initialState = {
  data: null,
  isLoading: false,
  error: null,
}

const searchFetching = (state) => {
  return { ...state, isLoading: true }
}

const searchFetched = (state, payload) => {
  return { ...state, isLoading: false, recipes: payload }
}

const searchFailed = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPE_SEARCH:
      return searchFetching(state)
    case RECEIVE_RECIPE_SEARCH:
      return searchFetched(state, payload)
    case FAIL_RECIPE_SEARCH:
      return searchFailed(state, payload)
    default:
      return state
  }
}
