import songsModel from "./songs-model.js";

export const findAllSongs = async () =>
    await songsModel.find()