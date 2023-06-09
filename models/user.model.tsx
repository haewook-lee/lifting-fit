import { models, model, Schema } from "mongoose"

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User = models.User || model("User", UserSchema)

export default User
