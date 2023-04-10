import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/mongodb"

export const getExercise = async (slug: string | string[]) => {
  const mongoClient = await clientPromise

  const data = mongoClient
    .db("liftingfit")
    .collection("exercises")
    .findOne({ slug: slug })

  return data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const eid = req.query.eid!

  const data = await getExercise(eid)

  if (!data) {
    res.status(404).json("Exercise Not Found!")
  }

  res.status(200).json({ data })
}
