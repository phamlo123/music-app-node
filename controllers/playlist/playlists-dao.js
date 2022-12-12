import playlistsModel from "./playlists-model.js";
import songsModel from "../song/songs-model.js";
export const createPlaylist = async (playlist) => {
    return await playlistsModel.create(playlist)
}

export const findPlaylistByName = async (name) =>
    await playlistsModel.findOne({name: name}).populate('songs')

export const findAllPlaylists = async () =>
    await playlistsModel.find().populate('owner')

export const findPlaylistsForUser = async (uid) => 
    await playlistsModel.find({user: uid}, {user: false})

export const deletePlaylist = async (pid) =>
    await playlistsModel.deleteOne({_id: pid})

export const updatePlaylist = async (pid, playlistUpdates) =>
    await playlistsModel.updateOne({_id: pid},
        {$set: playlistUpdates})

export const findPlaylistById = async (pid) =>
    await playlistsModel.findById(pid).populate('songs').populate('owner')

export const addSongToPlaylist = async (pid, song) => {
    let local_song = await songsModel.findOne({track_id: song.track_id})
    let sid = null;
    // already exists in our database
    if (local_song != null) {
        sid = local_song._id;
    } else {
        local_song = await songsModel.create(song)
        sid = local_song._id
    }

    const status = await playlistsModel.updateOne(
        { _id: pid},
        { $push: { songs: sid } },
    )
    return await findPlaylistById(pid);
}

export const removeSongFromPlaylist = async (pid, song_id) => {

}