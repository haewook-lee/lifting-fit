import dbConnect from "../../lib/dbConnect"
import jwt from "jsonwebtoken"
import { setCookies } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../lib/mongodb"
import { ObjectId } from "mongodb"

type UserModel = {
  username: String
  email: String
  password: String
}

export interface TokenInterface {
  userId: ObjectId
  iat: Number
  exp: Number
}

type UserList = {
  users: UserModel[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ((req.method = "POST")) {
    const mongoClient = await clientPromise

    const userExists = async (user: UserModel) => {
      const response = await mongoClient
        .db("liftingfit")
        .collection("users")
        .findOne({ email: user.email, password: user.password })

      return response
    }

    const existingUser = await userExists(req.body)

    if (!existingUser) {
      return res.status(422).json({ message: "Invalid Email or Password" })
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    )

    setCookies("token", token, {
      req,
      res,
      maxAge: 60 * 60 * 24, // 1 day
      //   path: "/",
    })

    // setCookies("token", token, {
    //   maxAge: 60 * 60 * 24,
    //   path: "/",
    // })

    res.status(201).json({
      message: "Log in success!",
      token: token,
    })
  }
}
