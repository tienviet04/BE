import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GenreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true

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

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;
