import mongoose, { Schema, Document } from 'mongoose';

interface Chain extends Document{
  author: mongoose.Types.ObjectId;
  startNumber: number;
  createdAt: Date;
}

const chainSchema = new Schema<Chain>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startNumber: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Chain>('Chain', chainSchema);
