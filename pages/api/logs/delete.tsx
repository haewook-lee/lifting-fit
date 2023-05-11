import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const mongoClient = await clientPromise

    console.log(req.body)

    // delete set
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
            // $unset: { [updatedSet]: [log.rep] + "," + [log.weight] },
            $unset: { [updatedSet2]: 0 },
          }
        )

      return response
    }

    const deletedSet = await deleteSet(req.body)

    res.status(200).json({ deletedSet })
  }
}
