import express from "express";

import MovieCartoonsController from "../controllers/cartoon.js";

const CartoonRouter = express.Router();

const moviesController = new MovieCartoonsController();

CartoonRouter.get("/search", moviesController.searchMovieCartoons);
CartoonRouter.get("/", moviesController.getAllMovieCartoons);
CartoonRouter.get("/all", moviesController.getAll);
CartoonRouter.get("/:slug", moviesController.getMovieCartoonSlug);
CartoonRouter.post("/", moviesController.createMovieCartoon);
CartoonRouter.get("/:id", moviesController.getMovieCartoonDetail);
CartoonRouter.put("/:id", moviesController.updateMovieCartoon);
CartoonRouter.delete("/:id", moviesController.deleteMovieCartoon);

export default CartoonRouter;
