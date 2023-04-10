import { NextApiRequest, NextApiResponse } from "next"
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
  // const newDat = JSON.parse(JSON.stringify(data)).map(
  //   (value: any) => value.slug
  // )
  // let paths = []
  // for (let slug of newDat) {
  //   paths.push({ params: { slug: slug } })
  // }
  // console.log(typeof data)
  // console.log(data[1])
  // console.log(paths)

  if (!data) {
    res.status(404).json("Exercise Not Found!")
  }

  res.status(200).json({ data })
}
