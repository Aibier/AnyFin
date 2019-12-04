import * as mongoose from 'mongoose';
import { User } from '@/interface/user-models';

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
});

export const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
export class LogInDto {
  public email: string;
  public password: string;
}
