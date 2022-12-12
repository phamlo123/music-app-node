import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'},
    playlist: {type: mongoose.Schema.Types.ObjectId, ref: 'PlaylistsModel'},
}, {collection: 'likes'})
export default likesSchema