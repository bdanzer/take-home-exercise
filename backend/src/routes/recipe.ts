import { Request, Response, NextFunction } from "express"
import { RecipeModel } from "../models"

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const recipeId = req.params.id

  if (!recipeId) res.status(404).send()

  const foundRecipes = await RecipeModel.findById(recipeId)

  if (foundRecipes) {
    res.status(200).send(foundRecipes)
  } else {
    res.status(404).send()
  }
}
