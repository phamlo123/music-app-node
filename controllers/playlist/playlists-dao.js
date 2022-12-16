import playlistsModel from "./playlists-model.js";
import songsModel from "../song/songs-model.js";
import usersModel from "../user/users-model.js";
import e from "cors";
export const createPlaylist = async (playlist) => {
    if (playlist.featured !== "featured") {
        playlist.featured = false;
    } else {
        playlist.featured = true;
    }
    const pl = await playlistsModel.create(playlist);
    return findPlaylistById(pl._id);
}

export const findPlaylistByName = async (name) =>
    await playlistsModel.findOne({name: name}).populate('songs')

// this is for anonymous users
export const findAllPlaylists = async () =>
    await playlistsModel.find().populate('owner').sort({dateCreated: -1})

// for logged in users (non featured)
export const findPlaylistsForUser = async (uid) => {
    let pl = await playlistsModel.find({owner: uid, featured: false}).populate("owner")
    const followees = await usersModel.findOne({_id: uid})
    if (followees != null) {
        for (let i=0;i<followees.followees.length; i++) {
            let a = await playlistsModel.find({owner: followees.followees[i], featured: false}).populate("owner").sort({dateCreated: -1})
            pl.push(...a);
        }
    }
    return pl
}

export const findFeaturedPlaylists = async () =>{
    let featuredPl = await playlistsModel.find({featured: true}).populate("owner")
    return featuredPl
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

export const getPlaylistsByUser = async (uid) => {
    return await playlistsModel.find({owner: uid} ).populate('songs').populate('owner').sort({dateCreated: -1});
}