import { getCookie } from "cookies-next"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import clientPromise from "./mongodb"

export default async function checkLoggedIn(): Promise<any> {
  interface TokenInterface {
    userId: string
    iat: number
    exp: number
  }

  const token = getCookie("token")

  if (!token) return

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

  let stringUser: string = JSON.parse(JSON.stringify(user))

  return stringUser
}
