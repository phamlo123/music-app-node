import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: String,
    firstName: String,
    lastName: String,
    featured: {type: Boolean, default: false},
    playlists: [{type: mongoose.Schema.Types.ObjectId, ref: 'PlaylistsModel'}],
    followees: [{type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'}]
}, {collection: 'users'})

export default usersSchema;

