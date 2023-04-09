import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/mongodb"

export const getExercises = async (id: string | ObjectId) => {
  id = typeof id === "string" ? new ObjectId(id) : id
  const mongoClient = await clientPromise

  const data = mongoClient
    .db("liftingfit")
    .collection("exercises")
    .findOne({ _id: id })

  return data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const eid = req.query.eid!

  const data = await getExercises(new ObjectId(eid as string))

  if (!data) {
    res.status(404).json("Exercise Not Found!")
  }

  res.status(200).json({ data })
}
