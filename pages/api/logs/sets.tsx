import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const mongoClient = await clientPromise

    // add set
    const addSet = async (log: any) => {
      const target = log.target
      const exercise = log.exercise
      const updatedSet = "exercises." + target + "." + exercise
      const response = await mongoClient
        .db("logs")
        .collection(log.user)
        .updateOne(
          {
            date: log.date,
          },
          {
            $push: { [updatedSet]: [log.rep] + "," + [log.weight] },
          }
        )

      return response
    }

    const addedSet = await addSet(req.body)

    res.status(200).json({ addedSet })
  }
}
