import Movie from "../models/MovieModel.js";

class MoviesController {
  // GET /movies
  async getAllMovies(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const movies = await Movie.find()
        .populate(["category", "genres"])
        .skip((page - 1) * limit)
        .limit(Number(limit));
      const totalMovies = await Movie.countDocuments();

      res.status(200).json({
        message: "Get All Movies Done",
        data: movies,
        currentPage: page,
        totalPages: Math.ceil(totalMovies / limit),
        totalMovies: totalMovies,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async getAll(req, res) {
    try {
      const movies = await Movie.find().populate(["category", "genres"]);
      res.status(200).json({
        message: "Get All Movies Done",
        data: movies,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  // GET /movies/:id
  async getMovieDetail(req, res) {
    try {
      const movie = await Movie.findById(req.params.id)
        .populate("category")
        .populate("genres");
      if (!movie) {
        return res.status(404).json({
          message: "Movie Not Found",
        });
      }
      res.status(200).json({
        message: "Get Movie Detail Done",
        data: movie,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  //Get moviesSlug
  async getMovieSlug(req, res) {
    try {
      const movie = await Movie.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("genres");
      if (!movie) {
        return res.status(404).json({
          message: "Movie Not Found",
        });
      }
      res.status(200).json({
        message: "Get Movie Detail Done",
        data: movie,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  // POST /movies
  async createMovie(req, res) {
    // req.body
    // const newMovie = new Movie(req.body);
    const saveMovie = await Movie.create(req.body);
    res.status(201).json({
      message: "Create Movie Successfull",
      data: saveMovie,
    });
  }
  // PUT /movies/:id
  async updateMovie(req, res) {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body);
      if (!movie) {
        return res.status(404).json({
          message: "Movie Not Found",
        });
      }
      const updateMovie = await Movie.findById(req.params.id);
      res.status(200).json({
        message: "Update Movie Successfull",
        data: updateMovie,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  // DELETE /movies/:id
  async deleteMovie(req, res) {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(404).json({
          message: "Movie Not Found",
        });
      }
      res.status(200).json({
        message: "Delete Movie Done",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  //Search
  async searchMovies(req, res) {
    try {
      const { name } = req.query;
      const movies = await Movie.find({ name: { $regex: new RegExp(name, "i") } });

      if (movies.length === 0) {
        return res.status(404).json({
          message: "No movies found with the provided name",
        });
      }

      res.status(200).json({
        message: "Get Movies by Name Done",
        data: movies,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default MoviesController;
