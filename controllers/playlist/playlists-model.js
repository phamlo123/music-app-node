
import mongoose from "mongoose";
import playlistsSchema from "./playlists-schema.js";

const playlistsModel = mongoose.model('PlaylistsModel', playlistsSchema)

export default playlistsModel;