import mongoose, { Document, Schema } from 'mongoose';

// Interface for the Tenant model
interface ITenant extends Document {
  name: string;
  createdAt: Date;
}

// Tenant schema definition
const tenantSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// Tenant model
const Tenant = mongoose.model<ITenant>('Tenant', tenantSchema);

export default Tenant;
