import { getCookie } from "cookies-next"
import jwt from "jsonwebtoken"
import User from "../models/user.model"
import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import clientPromise from "./mongodb"

export default async function checkLoggedIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  interface TokenInterface {
    userId: string
    iat: number
    exp: number
  }

  const token = getCookie("token", { req, res })

  try {
    const mongoClient = await clientPromise

    const data = jwt.verify(
      token as any,
      process.env.TOKEN_SECRET as string
    ) as unknown as TokenInterface

    const loginUser = async (id: string) => {
      const response = await mongoClient
        .db("liftingfit")
        .collection("users")
        .findOne({ _id: new ObjectId(id) })

      return response
    }

    let user = await loginUser(data.userId)

    user = JSON.parse(JSON.stringify(user))

    return user
  } catch (error) {
    return null
  }
}
