import mongoose from "mongoose";

const songsSchema = new mongoose.Schema({
    name: String,
    duration: String,
    artist_name: String,
    track_id: String,
    genre: String,
}, {collection: 'songs'})

export default songsSchema;