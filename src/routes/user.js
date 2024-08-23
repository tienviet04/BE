import express from "express";
import AuthController from "../controllers/user.js";

const UserRouter = express.Router();

const UserContro = new AuthController();


UserRouter.post("/login", UserContro.login);
UserRouter.post("/register", UserContro.register);


export default UserRouter;
