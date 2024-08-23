import NewMovies from "../models/newMovies.js";

class NewMoviessController {
    // GET /NewMoviess
    async getAllNewMoviess(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const NewMoviess = await NewMovies.find()
                .populate(["category", "genres"])
                .skip((page - 1) * limit)
                .limit(Number(limit));
            const totalNewMoviess = await NewMovies.countDocuments();

            res.status(200).json({
                message: "Get All NewMoviess Done",
                data: NewMoviess,
                currentPage: page,
                totalPages: Math.ceil(totalNewMoviess / limit),
                totalNewMoviess: totalNewMoviess,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    async getAll(req, res) {
        try {
            const NewMoviess = await NewMovies.find().populate(["category", "genres"]);
            res.status(200).json({
                message: "Get All NewMoviess Done",
                data: NewMoviess,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    // GET /NewMoviess/:id
    // async getNewMoviesDetail(req, res) {
    //     try {
    //         const NewMovies = await NewMovies.findById(req.params.id)
    //             .populate("category")
    //             .populate("genres");
    //         if (!NewMovies) {
    //             return res.status(404).json({
    //                 message: "NewMovies Not Found",
    //             });
    //         }
    //         res.status(200).json({
    //             message: "Get NewMovies Detail Done",
    //             data: NewMovies,
    //         });
    //     } catch (error) {
    //         res.status(400).json({
    //             message: error.message,
    //         });
    //     }
    // }
    //Get NewMoviessSlug
    async getNewMoviesSlug(req, res) {
        try {
          const movie = await NewMovies.findOne({ slug: req.params.slug })
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

    // POST /NewMoviess
    async createNewMovies(req, res) {
        // req.body
        // const newNewMovies = new NewMovies(req.body);
        const saveNewMovies = await NewMovies.create(req.body);
        res.status(201).json({
            message: "Create NewMovies Successfull",
            data: saveNewMovies,
        });
    }
    // PUT /NewMoviess/:id
    async updateNewMovies(req, res) {
        try {
            const NewMovies = await NewMovies.findByIdAndUpdate(req.params.id, req.body);
            if (!NewMovies) {
                return res.status(404).json({
                    message: "NewMovies Not Found",
                });
            }
            const updateNewMovies = await NewMovies.findById(req.params.id);
            res.status(200).json({
                message: "Update NewMovies Successfull",
                data: updateNewMovies,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    // DELETE /NewMoviess/:id
    async deleteNewMovies(req, res) {
        try {
            const NewMovies = await NewMovies.findByIdAndDelete(req.params.id);
            if (!NewMovies) {
                return res.status(404).json({
                    message: "NewMovies Not Found",
                });
            }
            res.status(200).json({
                message: "Delete NewMovies Done",
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    //Search
    async searchNewMoviess(req, res) {
        try {
            const { name } = req.query;
            const NewMoviess = await NewMovies.find({ name: { $regex: new RegExp(name, "i") } });

            if (NewMoviess.length === 0) {
                return res.status(404).json({
                    message: "No NewMoviess found with the provided name",
                });
            }

            res.status(200).json({
                message: "Get NewMoviess by Name Done",
                data: NewMoviess,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
}

export default NewMoviessController;
