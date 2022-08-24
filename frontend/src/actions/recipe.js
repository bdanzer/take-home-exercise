import { baseUrl } from "../utils/baseUrl"

export const GET_RECIPE_SEARCH = "GET_RECIPE_SEARCH"
export const RECEIVE_RECIPE_SEARCH = "RECEIVE_RECIPE_SEARCH"
export const FAIL_RECIPE_SEARCH = "FAIL_RECIPE_SEARCH"

const fetchingSearch = () => ({
  type: GET_RECIPE_SEARCH,
})

const fetchedSearch = (payload) => ({
  type: RECEIVE_RECIPE_SEARCH,
  payload,
})

const failedSearch = (payload) => ({
  type: FAIL_RECIPE_SEARCH,
  payload,
})

export const executeSearchByRecipeId = async (recipeId) => {
  const response = await fetch(`${baseUrl}dev/api/recipe/${recipeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const searchResults = await response.json()
  return searchResults
}

export const getRecipes = (recipeId) => {
  return (dispatch) => {
    dispatch(fetchingSearch())
    return executeSearchByRecipeId(recipeId)
      .then((res) => dispatch(fetchedSearch(res)))
      .catch((err) => dispatch(failedSearch(err)))
  }
}
