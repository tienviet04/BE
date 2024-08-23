import mongoose from "mongoose";

const serverDataSchema = new mongoose.Schema({
    server_data: [
        {
            name: { type: String, required: true },
            slug: { type: String, required: true },
            filename: { type: String, required: true },
            link_embed: { type: String, required: true },
            link_m3u8: { type: String, required: true }
        }
    ]
});

const ServerData = mongoose.model("ServerData", serverDataSchema);
export default ServerData;
export { serverDataSchema };