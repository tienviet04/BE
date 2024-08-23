import moviesRouter from "./movies.js";
import categoriesRouter from "./categories.js";
import genresRouter from "./genres.js";
import CartoonRouter from "./cartoon.js";
import newRouter from "./newmovies.js";
import AllRouter from "./all.js";
import UserRouter from "./user.js";


export default function routes(app) {
  app.get("/", (req, res) => {
    res.send("Home");
  });

  app.use("/movies", moviesRouter);
  app.use("/all", AllRouter);
  app.use("/user", UserRouter);
  app.use("/newmovies", newRouter);
  app.use("/cartoon", CartoonRouter);
  app.use("/categories", categoriesRouter);
  app.use("/genres", genresRouter);

}
