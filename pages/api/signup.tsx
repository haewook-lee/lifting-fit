import UserModel from "../../models/user.model"
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
}
