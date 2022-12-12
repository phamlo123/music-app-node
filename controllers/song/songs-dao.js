import songsModel from "./songs-model.js";

export const findAllSongs = async () =>
    await songsModel.find()

export const createSong = async (song) => {
    const local_song = await songsModel.findOne({track_id: song.track_id})
    // already exists in our database
    if (local_song != null) {
        return local_song
    }
    return await songsModel.create(song)
}

export const findSongByName = async (name) => {
    return await songsModel.findOne({"track_name": name})
}

export const findSongWithNameContains = async (name) => {
    return await songsModel.find(
        { "track_name": { "$regex": name} },
    );
}

export const deleteSong = async (sid) =>
    await songsModel.deleteOne({_id: sid})

export const updateSong = async (sid, songUpdates) =>
    await songsModel.updateOne({_id: sid},
        {$set: songUpdates})

export const findSongById = async (sid) =>
    await songsModel.findById(sid)