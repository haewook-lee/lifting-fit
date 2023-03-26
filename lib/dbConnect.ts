import mongoose from "mongoose"

async function dbConnect() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
  }

  return await mongoose.connect(process.env.MONGODB_URI)
}

export default dbConnect
