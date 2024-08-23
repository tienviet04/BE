import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import { getUserByEmail } from "../services/user.js";
import { loginValidator, registerValidator } from "../validations/auth.js";

class AuthController {
    async register(req, res, next) {
        try {
            const { email, username, password } = req.body;
            const { error } = registerValidator.validate(req.body);
            if (error) {
                const errors = error.details.map((err) => err.message).join(", ");
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: errors,
                });
            }
            const emailExist = await getUserByEmail(email);
            if (emailExist) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Email đã được đăng ký",
                });
            }
            const hashPassword = await bcryptjs.hash(password, 10);
            const user = await User.create({
                email,
                username,
                password: hashPassword,
            });
            // b4 remove password in res
            res.status(StatusCodes.OK).json({
                message: "Đăg ký thành công",
                data: { ...user.toObject(), password: undefined },
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { error } = loginValidator.validate(req.body);
            if (error) {
                const errors = error.details.map((err) => err.message).join(", ");
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: errors,
                });
            }
            const checkUser = await getUserByEmail(email);
            if (!checkUser) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Email này chưa được đăng ký",
                });
            }

            const checkPassword = await bcryptjs.compare(password, checkUser.password);
            if (!checkPassword) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Mật khẩu không đúng vui lòng nhập lại!",
                });
            }

            const token = jwt.sign({ id: checkUser._id }, "process.env.SECRET_KEY", {
                expiresIn: "1w",
            });
            res.status(StatusCodes.OK).json({
                message: "Đăng nhập thành công",
                user: { ...checkUser.toObject(), password: undefined },
                token,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;