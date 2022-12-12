import reviewsModel from "./reviews-model.js";
import songsModel from "../song/songs-model.js";
import mongoose from "mongoose";
export const createReview = async (review) => {
    let local_song = await songsModel.findOne({track_id: review.track_id})

    let sid = null;
    let new_review = {review: review.review, user: review.author}
    review.review = null;
    review.author = null;
    
    // already exists in our database
    if (local_song != null) {
        sid = local_song.track_id;
    } else {
        local_song = await songsModel.create(review)
        sid = local_song.track_id
    }
    new_review.song = sid;

    return await reviewsModel.create(new_review)
}

export const findReviewsBySong = async (songid) => {
    const songs= await reviewsModel.find({song: songid}).populate('user').exec()
    return songs
}
    

export const findReviewsByUser = async (user) => {
    return await reviewsModel.find({user: user}).populate('user').exec()
}
    
