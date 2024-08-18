import mongoose, { Schema, Document } from 'mongoose';

interface Post extends Document {
  chain: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  prevPost?: mongoose.Types.ObjectId;
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  operand: number;
  result: number;
  createdAt: Date;
}

const postSchema = new Schema<Post>({
  chain: { type: Schema.Types.ObjectId, ref: 'Chain', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  prevPost: { type: Schema.Types.ObjectId, ref: 'Post'},
  operation: { type: String, enum: ['add', 'subtract', 'multiply', 'divide'], required: true },
  operand: { type: Number, required: true },
  result: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Post>('Post', postSchema);
