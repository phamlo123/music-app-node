import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'},
    song: String,
    review: String
}, {collection: 'reviews'})
export default reviewsSchema;