import type { User } from "../../../types/model-types";
import { UserStore } from "../../../types/store-types";
import { UserSchema } from "../schemas/user";

export const userMongoStore: UserStore = {
  async find(): Promise<User[]> {
    const users = await UserSchema.find().lean();
    return users;
  },

  async findById(id: string): Promise<User | null> {
    const user = await UserSchema.findById(id).lean();
    return user;
  },

  async create(user: Omit<User, "_id" | "role">): Promise<User> {
    const newUser = new UserSchema(user);
    const userObj = await newUser.save();
    return userObj.toObject();
  },

  async deleteById(id: string): Promise<void> {
    const user = await UserSchema.findById(id);
    if (!user) throw new Error("User not found");
    await user.deleteOne();
  },

  async deleteAll(): Promise<void> {
    await UserSchema.deleteMany({});
  },

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserSchema.findOne({ email }).lean();
    return user;
  },

  async makeAdmin(id: string): Promise<User | null> {
    const user = await UserSchema.findByIdAndUpdate(id, { role: "admin" }, { new: true }).lean();
    return user;
  },
};
