import usersModel from "./users-model.js";
import mongoose from "mongoose";

export const createUser = async (user) =>
    await usersModel.create(user)

export const findUserByUsername = async (username) =>
    await usersModel.findOne({username})

export const findUserByCredentials = async (username, password) =>
    await usersModel.findOne({username, password})

export const findAllUsers = async () =>
    await usersModel.find()

export const deleteUser = async (uid) =>
    await usersModel.deleteOne({_id: uid})


export const updateUser = async (uid, email) => {
    await usersModel.updateOne({_id: uid}, {$set: {email: email.email}})
    const updatedUser = await usersModel.findById(uid);
    return updatedUser;
}

export const findUserById = async (uid) =>
    await usersModel.findById(uid, {password: false})

export const follow = async (uid, fid) => {
    let f = fid.fid.toString()
    await usersModel.updateOne(
        { _id: uid},
        { $push: { followees: f } },
    );
    return usersModel.findOne({_id: f})
}
export const getFollowees = async (uid) => {
    let user = await usersModel.findById(uid).populate('followees')
    return user?.followees
}

export const unfollow = async (uid, fid) => {
    await usersModel.updateOne(
        { _id: uid},
        { $pull: { followees: fid.ufid } },
    );
    return usersModel.findOne({_id: fid.ufid})
}

export const getWhoToFollow = async (uid) => {
    uid = new mongoose.Types.ObjectId(uid);
    const user = await usersModel.findOne({_id: uid})
    let followees = user?.followees
    followees?.push(uid)
    if (followees == null) {
        return await usersModel.find();
    }
    let allUsers = await usersModel.find().select({_id: 1});
    allUsers.map((item)=> item._id)
    let res = []
    for (let i =0; i < allUsers.length; i++) {
        if (followees.includes(allUsers[i]._id)) {
            continue
        }
        res.push(allUsers[i]._id);
    }

    let results = []
    for (let i = 0; i < res.length; i++) {
        results.push(await usersModel.findOne({_id: res[i]}))
    }
    return results;
}