import mongoose, { Document, Schema } from 'mongoose';

// Interface for the User model
interface IUser extends Document {
  tenantId: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// User schema definition
const userSchema: Schema = new Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
