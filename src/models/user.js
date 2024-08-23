import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,

        },
        email: {
            type: String,

        },
        password: {
            type: String,

        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model("user", UserSchema);

export default User;
