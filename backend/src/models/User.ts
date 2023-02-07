import { model, Schema } from "mongoose";

export interface User {
  name: string;
  username: string;
  password: string;
  id: string;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default model<User>("User", UserSchema);
