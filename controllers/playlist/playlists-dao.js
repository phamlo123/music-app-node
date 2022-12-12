import playlistsModel from "./playlists-model.js";
import songsModel from "../song/songs-model.js";
import usersModel from "../user/users-model.js";
export const createPlaylist = async (playlist) => {
    return await playlistsModel.create(playlist)
}

export const findPlaylistByName = async (name) =>
    await playlistsModel.findOne({name: name}).populate('songs')

export const findAllPlaylists = async () =>
    await playlistsModel.find().populate('owner')

export const findPlaylistsForUser = async (uid) => {
    let pl = await playlistsModel.find({owner: uid}).populate("owner")
    const followees = await usersModel.findOne({_id: uid})
    if (followees != null) {
        for (let i=0;i<followees.followees.length; i++) {
            let a = await playlistsModel.find({owner: followees.followees[i]}).populate("owner")
            pl.push(...a);
        }
    }
    return pl
}
    

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
    const p = await playlistsModel.findById(pid);
    if (p?.songs.includes(sid)) {
        return await findPlaylistById(pid);
    }

    const status = await playlistsModel.updateOne(
        { _id: pid},
        { $push: { songs: sid } },
    )
    return await findPlaylistById(pid);
}

export const removeSongFromPlaylist = async (pid, song_id) => {
    await playlistsModel.updateOne(
        { _id: pid},
        { $pull: { songs: song_id.track_id } },
    );
    return await playlistsModel.findById(pid).populate('songs').populate('owner');
}
