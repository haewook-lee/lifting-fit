import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/mongodb"

export const getUser = async (id: string | ObjectId) => {
  id = typeof id === "string" ? new ObjectId(id) : id
  const mongoClient = await clientPromise

  const data = mongoClient
    .db("liftingfit")
    .collection("users")
    .findOne({ _id: id })

  return data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const uid = req.query.uid!

  const data = await getUser(new ObjectId(uid as string))

  if (!data) {
    res.status(404).json("User Not Found!")
  }

  res.status(200).json({ user: data })
}
