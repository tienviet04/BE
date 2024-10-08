import express from "express";
import MoviesController from "../controllers/movies.js";

const moviesRouter = express.Router();

const moviesController = new MoviesController();

moviesRouter.get("/search", moviesController.searchMovies);
moviesRouter.get("/", moviesController.getAllMovies);
moviesRouter.get("/all", moviesController.getAll);
moviesRouter.get("/:slug", moviesController.getMovieSlug);
moviesRouter.post("/", moviesController.createMovie);
moviesRouter.get("/:id", moviesController.getMovieDetail);
moviesRouter.put("/:id", moviesController.updateMovie);
moviesRouter.delete("/:id", moviesController.deleteMovie);

export default moviesRouter;
