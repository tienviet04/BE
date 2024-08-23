import AllMovies from "../models/allMovies.js";


class AllMoviesController {
    // GET /NewMoviess
    async getAllMovies(req, res) {
        try {
            const { page = 1, limit = 10, genre } = req.query;
            const filter = genre ? { genres: genre } : {};

            const movies = await AllMovies.find(filter)
                .populate(["category", "genres"])
                .skip((page - 1) * limit)
                .limit(Number(limit));
            const totalMovies = await AllMovies.countDocuments(filter);

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
            const { genre } = req.query;
            const filter = genre ? { genres: genre } : {};

            const movies = await AllMovies.find(filter)
                .populate(["category", "genres"]);
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
    //Get NewMoviessSlug
    async getAllMoviesSlug(req, res) {
        try {
            const movie = await AllMovies.findOne({ slug: req.params.slug })
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
    async createAllMovies(req, res) {
        // req.body
        // const newNewMovies = new NewMovies(req.body);
        const saveNewMovies = await AllMovies.create(req.body);
        res.status(201).json({
            message: "Create NewMovies Successfull",
            data: saveNewMovies,
        });
    }
    // PUT /NewMoviess/:id
    async updateAllMovies(req, res) {
        try {
            const NewMovies = await AllMovies.findByIdAndUpdate(req.params.id, req.body);
            if (!NewMovies) {
                return res.status(404).json({
                    message: "NewMovies Not Found",
                });
            }
            const updateNewMovies = await AllMovies.findById(req.params.id);
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
    async deleteAllMovies(req, res) {
        try {
            const NewMovies = await AllMovies.findByIdAndDelete(req.params.id);
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
    async searchAllMoviess(req, res) {
        try {
            const { name } = req.query;
            const NewMoviess = await AllMovies.find({ name: { $regex: new RegExp(name, "i") } });

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

export default AllMoviesController;
