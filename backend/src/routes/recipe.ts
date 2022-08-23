import { Request, Response, NextFunction } from "express"
import { RecipeModel } from "../models"

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const recipeId = req.params.id

  if (!recipeId) return res.send(404)

  const foundRecipes = await RecipeModel.findById(recipeId)

  if (foundRecipes) {
    res.send(foundRecipes)
  } else {
    res.send(404)
  }
}
