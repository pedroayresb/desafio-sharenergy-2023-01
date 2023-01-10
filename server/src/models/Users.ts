import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

export default model<IUser>('User', UserSchema);