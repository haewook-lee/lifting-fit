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
  if (req.method === "GET") {
    const mongoClient = await clientPromise

    const data = await mongoClient
      .db("liftingfit")
      .collection("users")
      .find()
      .toArray()

    res.status(200).json({ users: JSON.parse(JSON.stringify(data)) })
  } else if ((req.method = "POST")) {
    const mongoClient = await clientPromise

    const userExists = async (user: UserModel) => {
      const response = await mongoClient
        .db("liftingfit")
        .collection("users")
        .findOne({ email: user.email })

      return response
    }

    const existingUser = await userExists(req.body)

    if (existingUser) {
      return res.status(422).json({ message: "Email already in use!" })
    }

    const addCustomer = async (user: UserModel): Promise<ObjectId> => {
      const response = await mongoClient
        .db("liftingfit")
        .collection("users")
        .insertOne(user)

      return response.insertedId
    }

    const newUser = await addCustomer(req.body)

    res.status(200).json({ message: newUser })
  }

  //   const users = UserModel
  //   if (req.method === "POST") {
  //     const userExist = await users.findOne({ email: email })

  //     if (userExist)
  //       return res.status(422).json({ message: "Email already in use!" })

  //     const user = new User({ username, email, password })
  //     await user.save()

  //     const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
  //       expiresIn: "1d",
  //     })

  //     setCookies("token", token, {
  //       req,
  //       res,
  //       maxAge: 60 * 60 * 24, // 1 day
  //       path: "/",
  //     })

  //     res.status(201).json(user)
  //   } else {
  //     res.status(424).json({ message: "Invalid method!" })
  //   }
}
