
import likesModel from "./likes-model.js";

export const userLikesPlaylist = async (uid, pid) => {
    return await likesModel.create({user: uid, playlist: pid})
}
export const userUnlikesPlaylist = async(uid, pid) => {
    return await likesModel.deleteOne({user: uid, playlist: pid})
}
export const findPlaylistsLikedByUser = async(uid) => {
    return await likesModel
        .find({user: uid}, {user: false})
        .populate('playlist')
        .exec()
}
export const findUsersThatLikePlaylist = async(pid) => {
    return await likesModel.find({playlist: pid}, {playlist: false})
        .populate('user', 'username')
        .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()