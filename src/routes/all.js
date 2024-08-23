import express from "express";

import AllMoviesController from "../controllers/all.js";

const AllRouter = express.Router();

const NewController = new AllMoviesController();

AllRouter.get("/search", NewController.searchAllMoviess);
AllRouter.get("/", NewController.getAllMovies);
AllRouter.get("/all", NewController.getAll);
AllRouter.get("/:slug", NewController.getAllMoviesSlug);
AllRouter.post("/", NewController.createAllMovies);

AllRouter.put("/:id", NewController.updateAllMovies);
AllRouter.delete("/:id", NewController.deleteAllMovies);

export default AllRouter;