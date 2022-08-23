import React, { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Alert from "../../components/alert"
import { RecipeWrapper } from "./styles"
import { useDispatch, useSelector } from "react-redux"
import { getRecipes } from "../../actions/recipe"

function Recipe() {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  console.log({ params, location })
  const dispatch = useDispatch()
  const recipeId = params?.id
  const recipes = useSelector((s) => s.recipe.data)
  const loading = useSelector((s) => s.recipe.loading)
  const error = useSelector((s) => s.recipe.error)

  useEffect(() => {
    if (recipeId) {
      dispatch(getRecipes(recipeId, dispatch))
    }
  }, [recipeId])

  return (
    <RecipeWrapper>
      {error && <Alert severity="error" label={error.message} />}
      <Button onClick={() => navigate("/")} variant="contained" color="primary">
        Go Back To Home
      </Button>
      <Typography variant="h4" style={{ margin: "12px 0" }}>
        {location?.state?.name}
      </Typography>
      {!location.state && <Alert severity="warning" label="No recipes" />}
      <Paper style={{ padding: 16 }} elevation={4}>
        <Typography variant="h6">Ingredients</Typography>
        {location?.state?.ingredients?.map((ingredient) => (
          <Typography component="li" key={ingredient._id}>
            {ingredient.amount} {ingredient.unit} - {ingredient.name}
          </Typography>
        ))}
        <Typography variant="h6">Instructions</Typography>
        <Typography variant="body1">{location?.state?.instructions}</Typography>
      </Paper>
    </RecipeWrapper>
  )
}

export default Recipe
