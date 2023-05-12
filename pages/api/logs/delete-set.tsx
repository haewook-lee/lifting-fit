import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const mongoClient = await clientPromise

    // delete set
    // first function picks an array element and makes it null
    // second function removes all null elements from an array
    const deleteSet = async (log: any) => {
      const target = log.target
      const exercise = log.exercise
      const index = log.index
      const updatedSet = "exercises." + target + "." + exercise

      const updatedSet2 = updatedSet + "." + index

      const response = await mongoClient
        .db("logs")
        .collection(log.user)
        .updateOne(
          {
            date: log.date,
          },
          {
            $unset: { [updatedSet2]: 1 },
          }
        )

      return response
    }

    const deleteSet2 = async (log: any) => {
      const target = log.target
      const exercise = log.exercise
      const index = log.index
      const updatedSet = "exercises." + target + "." + exercise

      const updatedSet2 = updatedSet + "." + index

      const response = await mongoClient
        .db("logs")
        .collection(log.user)
        .updateOne(
          {
            date: log.date,
          },
          {
            $pull: { [updatedSet]: null },
          }
        )

      return response
    }

    const deletedSet = await deleteSet(req.body)
    const deletedSet2 = await deleteSet2(req.body)

    res.status(200).json({ deletedSet, deletedSet2 })
  }
}
