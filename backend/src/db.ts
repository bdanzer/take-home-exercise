import mongoose from "mongoose"

export const connectDb = async (): Promise<typeof mongoose> => {
  const url = `mongodb+srv://bdanzer:${process.env.DATABASE_PASS}@cluster1.zxqj5.mongodb.net`
  const connection = await mongoose.connect(url, {
    useNewUrlParser: true,
    keepAlive: true,
    connectTimeoutMS: 30000,
  })
  return connection
}
