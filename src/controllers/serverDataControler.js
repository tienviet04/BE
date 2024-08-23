import ServerData from "../models/ServerData.js";

class ServerController {
    async getAll(req, res) {
        try {
            const list = await ServerData.find();
            res.status(200).json({
                message: "Get Done",
                data: list,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    async getDetail(req, res) {
        try {
            const sv = await ServerData.findById(req.params.id);
            if (!sv) {
                return res.status(404).json({
                    message: "Not Found",
                });
            }
            res.status(200).json({
                message: "Get Done",
                data: sv,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    async creatCategory(req, res) {
        try {
            const sv = await ServerData.create(req.body);
            res.status(200).json({
                message: "Create Done",
                data: sv,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    async updateCategory(req, res) {
        try {
            const sv = await ServerData.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );
            if (!sv) {
                return res.status(404).json({
                    message: "Not Found",
                });
            }
            res.status(200).json({
                message: "Update Done",
                data: sv,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    async deleteCategory(req, res) {
        try {
            const sv = await ServerData.findByIdAndDelete(req.params.id);
            if (!sv) {
                return res.status(404).json({
                    message: "Not Found",
                });
            }
            res.status(200).json({
                message: "Delete Done",
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
}

export default ServerController;
