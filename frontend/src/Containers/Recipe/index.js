import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Alert from "../../components/alert"
import { RecipeWrapper } from "./styles"
import { useDispatch, useSelector } from "react-redux"
import { getRecipes } from "../../actions/recipe"
import SimpleSkeleton from "../../components/simpleSkeleton"

function Recipe() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const recipeId = params?.id
  const recipe = useSelector((s) => s.recipe.data)
  const loading = useSelector((s) => s.recipe.isLoading)
  const error = useSelector((s) => s.recipe.error)

  useEffect(() => {
    if (recipeId) {
      dispatch(getRecipes(recipeId, dispatch))
    }
  }, [recipeId])

  return (
    <RecipeWrapper>
      {error && <Alert severity="error" label={error.message} />}
      <Button
        onClick={() => navigate("/")}
        variant="contained"
        color="primary"
      >
        Go Back To Home
      </Button>
      <Typography variant="h4" style={{ margin: "12px 0" }}>
        {loading ? <SimpleSkeleton height="40px" /> : recipe?.name}
      </Typography>
      <Paper style={{ padding: 16 }} elevation={4}>
        <Typography variant="h6">Ingredients</Typography>
        {loading ? (
          <SimpleSkeleton height="100px" />
        ) : (
          recipe?.ingredients?.map((ingredient) => (
            <Typography component="li" key={ingredient._id}>
              {ingredient.amount} {ingredient.unit} - {ingredient.name}
            </Typography>
          ))
        )}
        <Typography variant="h6">Instructions</Typography>
        {loading ? (
          <SimpleSkeleton height="200px" />
        ) : (
          <Typography variant="body1">{recipe?.instructions}</Typography>
        )}
      </Paper>
    </RecipeWrapper>
  )
}

export default Recipe
