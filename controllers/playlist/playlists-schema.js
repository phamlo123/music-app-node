import mongoose from "mongoose";

const playlistsSchema = new mongoose.Schema({
    name: {type: String},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'SongsModel'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel', required: true }
}, {collection: 'playlists'})

export default playlistsSchema;

