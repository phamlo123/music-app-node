
import * as likesDao from "./likes-dao.js";

let likes = [
    {_id: '123', user: '111', movie: '123'},
    {_id: '234', user: '111', movie: '234'},
    {_id: '345', user: '222', movie: '345'},
    {_id: '456', user: '333', movie: '345'},
]

const LikesController = (app) => {
    const populate = (
        {
            rawResults, fieldToPopulate,
            sourceData, sourceField
        }) => {
        const populatedResults = rawResults.map((raw) => {
            const source = sourceData.find(source => source[sourceField] === raw[fieldToPopulate])
            return ({
                ...raw,
                [fieldToPopulate]: source
            })
        })
        return populatedResults
    }
    const userLikesPlaylist = async (req, res) => {
        const uid = req.params.uid
        const mid = req.params.mid

        const newLike = await likesDao.userLikesPlaylist(uid, mid)
        // likes.push(newLike)
        res.json(newLike)
    }
    const userUnlikesPlaylist = async (req, res) => {
        const uid = req.params.uid
        const mid = req.params.mid
        const status = await likesDao.userUnlikesPlaylist(uid, mid)

        // likes = likes.filter((l) => l.user !== uid && l.movie !== mid)
        res.send(status)
    }
    const findAllLikes = async (req, res) => {
        const likes = await likesDao.findAllLikes()
        res.json(likes)
    }
    const findPlaylistsLikedByUser = async (req, res) => {
        const uid = req.params.uid
        const movies = await likesDao.findPlaylistsLikedByUser(uid)
        res.json(movies)
        // const movies = likes.filter((like) => like.user === uid)
        // const populatedMovies = populate({
        //     rawResults: movies,
        //     fieldToPopulate: 'movie',
        //     sourceData: getMovies(),
        //     sourceField: '_id'
        // })
        // res.json(populatedMovies)
    }
    const findUsersThatLikePlaylist = async (req, res) => {
        const mid = req.params.mid
        const users = await likesDao.findUsersThatLikePlaylist(mid)
        res.json(users)

        // const usersWhoLikeMovie = likes.filter((like) => like.movie === mid)
        // const populateUsers = populate({
        //     rawResults: usersWhoLikeMovie,
        //     fieldToPopulate: 'user',
        //     sourceData: users,
        //     sourceField: '_id'
        // })
        // res.json(populateUsers)
    }

    app.post('/users/:uid/likes/:mid', userLikesPlaylist)
    app.delete('/users/:uid/unlikes/:mid', userUnlikesPlaylist)
    app.get('/likes', findAllLikes)
    app.get('/users/:uid/likes', findPlaylistsLikedByUser)
    app.get('/movies/:mid/likes', findUsersThatLikePlaylist)
    // app.put(updateLike)
}

export default LikesController;