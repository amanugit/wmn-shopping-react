import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provide product name"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Provide product description"],
    },
    price: {
      type: Number,
      required: [true, "Provide product price"],
    },
    priceDisc: {
      type: Number,
    },
    shippingCost: {
      type: Number,
      required: [true, "provide product shipping cost"],
    },
    superCat: {
      // men, kids, women
      type: String,
      required: [true, "provide product super category"],
    },
    subCat: {
      // bags, clothing, shoes
      type: String,
      required: [true, "provide product sub-category"],
    },
    // clothing => sports and pants
    itemCat: {
      type: String,
    },

    brand: {
      type: String,
    },
    sizes: [String],
    material: {
      type: String,
    },
    color: [String],
    countInStock: {
      type: Number,
      required: [true, "provide count in stock "],
    },
    shoeSize: [String],
    photo: {
      type: String,
      required: [true, "Product must have an image"],
    },
    adv_photo: {
      type: String,
    },
    images: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
