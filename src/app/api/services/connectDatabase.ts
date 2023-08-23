import mongoose from 'mongoose';

const connectDatabase = async () => {
  mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!);
};

export default connectDatabase;
