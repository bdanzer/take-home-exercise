import "dotenv/config"
import express from "express"
// import express from "serverless-express/express"
import bodyParser from "body-parser"
import { searchMiddleware, recipeMiddleware } from "./routes"
import cors from "cors"

export const app = express()
// add parsers for the body

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://feature-search.d3trv6vvetvuxy.amplifyapp.com",
    ],
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(async (res, req, next) => {
  await new Promise((resolve) => setTimeout(() => resolve(0), 1000)) //adding a set timeout to show loading states on the UI better for now
  next()
})
// create our routes
app.get("/api/recipe/:id", recipeMiddleware)
app.post("/api/search", searchMiddleware)

// Handle in-valid route
app.all("*", function (req, res) {
  const response = { data: null, message: "Route not found!!" }
  res.status(400).send(response)
})
