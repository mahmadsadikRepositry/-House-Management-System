import dotenv from 'dotenv'; 
import mongoose from "mongoose";

dotenv.config();

//Function To connect with Database
//Docs: https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.connect()
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "House-management-System",
      appName: "House-Management-System",
      //Put name of your application
    });
    console.log("Database Connected Successfully.")
  } catch (error) {
    console.error("Database Connection Failed", error);
  }
};

export default connectDB;
