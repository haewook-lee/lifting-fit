import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const mongoClient = await clientPromise

    // delete set
    const deleteExercise = async (log: any) => {
      const target = log.target
      const exercise = log.exercise
      const updatedExercise = "exercises." + target

      const response = await mongoClient
        .db("logs")
        .collection(log.user)
        .updateOne(
          {
            date: log.date,
          },
          {
            $unset: { [updatedExercise]: [exercise] },
          }
        )

      return response
    }

    const deletedExercise = await deleteExercise(req.body)

    res.status(200).json({ deletedExercise })
  }
}
