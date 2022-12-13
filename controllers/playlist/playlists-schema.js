import mongoose from "mongoose";

const playlistsSchema = new mongoose.Schema({
    name: {type: String},
    featured: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'SongsModel'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel', required: true }
}, {collection: 'playlists'})

export default playlistsSchema;

