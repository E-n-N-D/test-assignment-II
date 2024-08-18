import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://discussiondb.ywsk2.mongodb.net";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`MongoDB connected ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });