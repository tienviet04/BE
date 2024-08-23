import MovieCartoon from "../models/CartoonModel.js";


class MovieCartoonsController {
    // GET /MovieCartoons
    async getAllMovieCartoons(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const MovieCartoons = await MovieCartoon.find()
                .populate(["category", "genres"])
                .skip((page - 1) * limit)
                .limit(Number(limit));
            const totalMovieCartoons = await MovieCartoon.countDocuments();

            res.status(200).json({
                message: "Get All MovieCartoons Done",
                data: MovieCartoons,
                currentPage: page,
                totalPages: Math.ceil(totalMovieCartoons / limit),
                totalMovieCartoons: totalMovieCartoons,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    async getAll(req, res) {
        try {
            const MovieCartoons = await MovieCartoon.find().populate(["category", "genres"]);
            res.status(200).json({
                message: "Get All MovieCartoons Done",
                data: MovieCartoons,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    // GET /MovieCartoons/:id
    async getMovieCartoonDetail(req, res) {
        try {
            const MovieCartoon = await MovieCartoon.findById(req.params.id)
                .populate("category")
                .populate("genres");
            if (!MovieCartoon) {
                return res.status(404).json({
                    message: "MovieCartoon Not Found",
                });
            }
            res.status(200).json({
                message: "Get MovieCartoon Detail Done",
                data: MovieCartoon,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    //Get MovieCartoonsSlug
    async getMovieCartoonSlug(req, res) {
        try {
            const MovieCartoon = await MovieCartoon.findOne({ slug: req.params.slug })
                .populate("category")
                .populate("genres");
            if (!MovieCartoon) {
                return res.status(404).json({
                    message: "MovieCartoon Not Found",
                });
            }
            res.status(200).json({
                message: "Get MovieCartoon Detail Done",
                data: MovieCartoon,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    // POST /MovieCartoons
    async createMovieCartoon(req, res) {
        // req.body
        // const newMovieCartoon = new MovieCartoon(req.body);
        const saveMovieCartoon = await MovieCartoon.create(req.body);
        res.status(201).json({
            message: "Create MovieCartoon Successfull",
            data: saveMovieCartoon,
        });
    }
    // PUT /MovieCartoons/:id
    async updateMovieCartoon(req, res) {
        try {
            const MovieCartoon = await MovieCartoon.findByIdAndUpdate(req.params.id, req.body);
            if (!MovieCartoon) {
                return res.status(404).json({
                    message: "MovieCartoon Not Found",
                });
            }
            const updateMovieCartoon = await MovieCartoon.findById(req.params.id);
            res.status(200).json({
                message: "Update MovieCartoon Successfull",
                data: updateMovieCartoon,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    // DELETE /MovieCartoons/:id
    async deleteMovieCartoon(req, res) {
        try {
            const MovieCartoon = await MovieCartoon.findByIdAndDelete(req.params.id);
            if (!MovieCartoon) {
                return res.status(404).json({
                    message: "MovieCartoon Not Found",
                });
            }
            res.status(200).json({
                message: "Delete MovieCartoon Done",
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    //Search
    async searchMovieCartoons(req, res) {
        try {
            const { name } = req.query;
            const MovieCartoons = await MovieCartoon.find({ name: { $regex: new RegExp(name, "i") } });

            if (MovieCartoons.length === 0) {
                return res.status(404).json({
                    message: "No MovieCartoons found with the provided name",
                });
            }

            res.status(200).json({
                message: "Get MovieCartoons by Name Done",
                data: MovieCartoons,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
}

export default MovieCartoonsController;
