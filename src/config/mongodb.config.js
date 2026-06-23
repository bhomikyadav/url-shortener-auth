import mongoose from "mongoose";

const createMongoDBConnection = async () => {
  const connectingString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.e4t8ikh.mongodb.net/?appName=Cluster0`;
  console.log("connection String ", connectingString);
  try {
    await mongoose.connect(connectingString);
  } catch (error) {
    console.log(`MongoDB 💥 connection failed...`);
  }
};

createMongoDBConnection();
