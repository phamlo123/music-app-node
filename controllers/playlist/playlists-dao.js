import playlistsModel from "./playlists-model.js";

export const createPlaylist = async (playlist) =>
    await playlistsModel.create(playlist)

export const findPlaylistByName = async (name) =>
    await playlistsModel.findOne({name: name}).populate('songs')

export const findAllPlaylists = async () =>
    await playlistsModel.find()

export const findPlaylistsForUser = async (uid) => 
    await playlistsModel.find({user: uid}, {user: false})

export const deletePlaylist = async (pid) =>
    await playlistsModel.deleteOne({_id: pid})

export const updatePlaylist = async (pid, playlistUpdates) =>
    await playlistsModel.updateOne({_id: pid},
        {$set: playlistUpdates})

export const findPlaylistById = async (pid) =>
    await playlistsModel.findById(pid).populate('songs')