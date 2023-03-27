import dbConnect from "../../lib/dbConnect"
import UserModel from "../../models/user.model"
import jwt from "jsonwebtoken"
import { setCookies } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../lib/mongodb"
import { ObjectId } from "mongodb"

type UserModel = {
  username: String
  email: String
  password: String
}

type UserList = {
  users: UserModel[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ((req.method = "POST")) {
    const mongoClient = await clientPromise

    const userExists = async (user: UserModel) => {
      const response = await mongoClient
        .db("liftingfit")
        .collection("users")
        .findOne({ username: user.username, password: user.password })

      return response
    }

    const existingUser = await userExists(req.body)

    if (!existingUser) {
      return res.status(422).json({ message: "Invalid Username or Password" })
    }

    // const addCustomer = async (user: UserModel): Promise<ObjectId> => {
    //   const response = await mongoClient
    //     .db("liftingfit")
    //     .collection("users")
    //     .insertOne(user)

    //   return response.insertedId
    // }

    // const newUser = await addCustomer(req.body)

    res.status(200).json({ message: "Log in success!" })
  }
}
