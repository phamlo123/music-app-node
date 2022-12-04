import mongoose from "mongoose";

const playlistsSchema = new mongoose.Schema({
    name: String,
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'SongsModel'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'}
}, {collection: 'playlists'})

export default playlistsSchema;

