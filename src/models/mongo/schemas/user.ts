import { Schema, model } from "mongoose";
import { User } from "../../../types/model-types";

const userSchema = new Schema<User>({
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export const UserSchema = model("User", userSchema);
