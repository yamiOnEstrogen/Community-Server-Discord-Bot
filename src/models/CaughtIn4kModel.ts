import { Schema } from "mongoose";
import mongoose from "mongoose";

const CaughtIn4kSchema = new Schema({
    image: {
        type: String,
        required: true
    },
})

export default mongoose.model("CaughtIn4k", CaughtIn4kSchema)