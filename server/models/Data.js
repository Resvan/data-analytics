import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    total_count: {
        type: Number,
        required: true,
    },
    sold_count: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})
const User = mongoose.model("User", userSchema);
export default User