import dotenv from "dotenv";
import mongoose from "mongoose";
import connectToDatabase from "./config/db.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import products from "./data/product.js";
import colors from "colors";
dotenv.config();
connectToDatabase();
const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    Product.insertMany(products);
    console.log("data imported successfully");
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destoryData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log("data destroyed successfully");
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
if (process.argv[2] === "-d") {
  destoryData();
} else {
  importData();
}
