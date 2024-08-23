import express from "express";
import NewMoviessController from "../controllers/newmovies.js";

const newRouter = express.Router();

const NewController = new NewMoviessController();

newRouter.get("/search", NewController.searchNewMoviess);
newRouter.get("/", NewController.getAllNewMoviess);
newRouter.get("/all", NewController.getAll);
newRouter.get("/:slug", NewController.getNewMoviesSlug);
newRouter.post("/", NewController.createNewMovies);

newRouter.put("/:id", NewController.updateNewMovies);
newRouter.delete("/:id", NewController.deleteNewMovies);

export default newRouter;
