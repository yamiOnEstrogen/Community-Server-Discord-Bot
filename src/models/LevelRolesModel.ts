import { Schema } from "mongoose";
import mongoose from "mongoose";

const LevelRolesSchema = new Schema({
    role: {
        type: String,
        required: true
    },

    neededLevel: {
        type: String,
        required: true
    },

    levelMessage: {
        type: String,
        required: true,
    }
})

export default mongoose.model("LevelRoles", LevelRolesSchema)