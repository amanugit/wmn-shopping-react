import mongoose from "mongoose";
const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://amanu:amandom@cluster0.8q6vy.mongodb.net/wmn?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );
    console.log(
      `Mongo database connected: ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.error(`Error: ${error.mongoose}`.red.underline.bold);
    process.exit(1);
  }
};
export default connectToDatabase;
