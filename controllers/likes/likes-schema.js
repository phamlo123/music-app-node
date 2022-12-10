import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    playlist: {type: mongoose.Schema.Types.ObjectId, ref: 'PlaylistModel'},
}, {collection: 'likes'})
export default likesSchema