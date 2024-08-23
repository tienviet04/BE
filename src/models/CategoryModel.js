import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,

    },
    description: {
      type: String,

    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;
