import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/mongodb"

export const getAllExercises = async () => {
  const mongoClient = await clientPromise

  const data = mongoClient
    .db("liftingfit")
    .collection("exercises")
    .find()
    .toArray()

  return data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getAllExercises()

  console.log(data[1])

  if (!data) {
    res.status(404).json("Exercise Not Found!")
  }

  res.status(200).json({ user: data })
}
