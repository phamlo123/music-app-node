
import likesModel from "./likes-model.js";

export const userLikesMovie = async (uid, pid) => {
    return await likesModel.create({user: uid, playlist: pid})
}
export const userUnlikesMovie = async(uid, pid) => {
    return await likesModel.deleteOne({user: uid, playlist: pid})
}
export const findMoviesLikedByUser = async(uid) => {
    return await likesModel
        .find({user: uid}, {user: false})
        .populate('playlist')
        .exec()
}
export const findUsersThatLikeMovie = async(pid) => {
    return await likesModel.find({playlist: pid}, {playlist: false})
        .populate('user', 'username')
        .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()