import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"

export const getAllLogs = async (user: string) => {
  const mongoClient = await clientPromise

  const data = mongoClient.db("logs").collection(user).find().toArray()

  return data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const data = await getAllLogs("hello")

    res.status(200).json({ logs: JSON.parse(JSON.stringify(data)) })
  }
  if (req.method === "POST") {
    // check if the log for that date exists
    const mongoClient = await clientPromise

    const logExists = async (log: any) => {
      const existingLog = "exercises." + log.target + "." + log.exercise
      const response = await mongoClient
        .db("logs")
        .collection(log.user)
        .findOne({
          date: log.date,
          [existingLog]: { $exists: true },
        })

      return response
    }

    const doesLogExist = await logExists(req.body)

    if (doesLogExist)
      res.status(403).json({ message: "Exercise already logged!" })

    // const existingLog = await logExists(req.body)

    // I removed the below block, since I can upsert

    // // if it doesn't exist, add the log for that date
    // if (!existingLog) {
    //   const addLog = async (log: any) => {
    //     const response = await mongoClient
    //       .db("logs")
    //       .collection(log.user)
    //       .insertOne({
    //         date: log.date,
    //         exercises: { [log.target]: { [log.exercise]: [] } },
    //       }) // all the log data to make a new one

    //     return response
    //   }

    //   const addedLog = await addLog(req.body)

    //   res.status(200).json({ addedLog })
    // }

    // add the exercise for that log
    const addExercise = async (log: any) => {
      const target = log.target
      const exercise = log.exercise
      const updatedExercise = "exercises." + target + "." + exercise
      const response = await mongoClient
        .db("logs")
        .collection(log.user)
        .updateOne(
          {
            date: log.date,
          },
          {
            $set: { [updatedExercise]: [] },
          },
          {
            // will create new document if it doesn't exist
            upsert: true,
          }
        )

      return response
    }

    const addedExercise = await addExercise(req.body)

    res.status(200).json({ addedExercise })
  }
}
