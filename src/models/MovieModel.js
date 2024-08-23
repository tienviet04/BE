import mongoose from "mongoose";
import { serverDataSchema } from "./ServerData.js";
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    origin_name: {
      type: String,
    },
    type: {
      type: String,
    },
    poster_url: {
      type: String,
    },
    actor: {
      type: [String],
    },
    director: {
      type: [String],
    },
    content: {
      type: String,
    },
    status: {
      type: String,
    },
    genres: {
      type: [Schema.Types.ObjectId],
      ref: "Genre",
      required: true,
    },
    serverData: [serverDataSchema],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    thumb_url: {
      type: String,
    },
    rated: {
      type: Number,
    },
    chieurap: {
      type: String,
    },
    time: {
      type: String,
    },
    quality: {
      type: String,
    },
    lang: {
      type: String,
    },
    year: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
