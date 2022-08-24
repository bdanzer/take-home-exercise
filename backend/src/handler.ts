import { connectDb } from "./db"
import serverlessExpress from "@vendia/serverless-express"
import { app } from "."

let serverlessExpressInstance

async function setup(event, context) {
  await connectDb()
  serverlessExpressInstance = serverlessExpress({ app })
  return serverlessExpressInstance(event, context)
}

export function serverlessExpressHandler(event, context) {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context)

  return setup(event, context)
}
