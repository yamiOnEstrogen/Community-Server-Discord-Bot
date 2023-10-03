import { Schema } from "mongoose";
import mongoose from "mongoose";

const AnimeFourmSchema = new Schema({
    url: {
        type: String,
        required: true
    }
})

export default mongoose.model("AnimeFourm", AnimeFourmSchema)