// TODO Create a connected component to render a fetched recipe
import React from "react"
import { useSelector } from "react-redux"
import LinearProgress from "@material-ui/core/LinearProgress"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import { useNavigate } from "react-router-dom"
import Alert from "./alert"

function Recipes() {
  const recipes = useSelector((s) => s.search.recipes)
  const loading = useSelector((s) => s.search.isLoading)
  const navigate = useNavigate()

  if (!recipes) return null
  if (loading) return <LinearProgress />
  if (recipes?.length === 0)
    return (
      <Alert
        severity="warning"
        label="There were no recipe results, try another search"
      />
    )

  return (
    <Paper elevation={3}>
      {recipes.map((recipe) => (
        <MenuItem
          key={recipe.id}
          onClick={() =>
            navigate(`/recipe/${recipe.id}`, {
              state: recipe,
            })
          }
        >
          {recipe.name}
        </MenuItem>
      ))}
    </Paper>
  )
}

export default Recipes
