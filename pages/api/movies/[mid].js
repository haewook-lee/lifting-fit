import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/mongodb"

export default async (req, res) => {
  const { mid } = req.query
  // The string HAS to be turned into an ObjectID to query mongoDB
  const objid = new ObjectId(mid)

  const client = await clientPromise
  const db = client.db("sample_mflix")

  const movies = await db.collection("movies")

  const query = { _id: objid }
  const options = { projection: { _id: 1, title: 1 } }

  const movie = await movies.findOne(query, options)

  res.json(movie)
}
