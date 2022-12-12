import mongoose from "mongoose";

const songsSchema = new mongoose.Schema({
    track_name: String,
    duration: Number,
    artist_name: String,
    track_id: String,
    album: String
}, {collection: 'songs'})

export default songsSchema;