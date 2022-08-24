import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { HomeWrapper } from "./styles"
import TextField from "@material-ui/core/TextField"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import * as actions from "../../actions"
import Recipes from "../../components/recipes"
import Alert from "../../components/alert"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: "",
      ingredients: [],
    }
  }
  fetchSearch = () => {
    this.props.searchRecipes(this.state.term, this.state.ingredients)
  }
  handleSearch = (event) => {
    const term = event.target.value
    this.setState({ term })
  }
  handleIngredient = (ingredient, event) => {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ ingredients })
  }
  render() {
    const { term, ingredients } = this.state
    const haveNoIngredients = ingredients.length === 0
    return (
      <HomeWrapper>
        <TextField
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
          value={term}
          label="Search"
          placeholder="Search for Recipe Names"
          variant="filled"
        />

        <div>
          <Typography variant="h6" style={{ marginTop: 12, marginBottom: 0 }}>
            Ingredients on hand
          </Typography>
          {haveNoIngredients && (
            <Alert
              severity={"error"}
              label="Must have an ingredient to search"
            />
          )}
          {ingredientList.map((ingredient) => (
            <FormControlLabel
              key={ingredient}
              control={
                <Checkbox
                  checked={ingredients.includes(ingredient)}
                  onChange={(e) => this.handleIngredient(ingredient, e)}
                  value={ingredient}
                />
              }
              label={ingredient}
            />
          ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={haveNoIngredients}
          onClick={this.fetchSearch}
        >
          search
        </Button>
        <Divider style={{ marginTop: 12, marginBottom: 12 }} />
        <Recipes />
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
