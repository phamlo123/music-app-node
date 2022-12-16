import * as userDao from './users-dao.js'

let currentUser = null

const UsersController = (app) => {



    const findAllUsers = async (req, res) => {
        const users = await userDao.findAllUsers()
        res.json(users)
    }
    const createUser = async (req, res) => {
        const newUser = req.body;
        const actualUser = await userDao.createUser(newUser)
        res.json(actualUser)
    }
    const updateUser = () => {}
    const deleteUser = () => {}

    const register = async (req, res) => {
        const user = req.body;
        console.log(user)
        const existingUser = await userDao
            .findUserByUsername(user.username)
        if(existingUser) {
            res.sendStatus(403)
            return
        }
        if (user.featured === "false") {
            user.featured = false;
        } else {
            user.featured = true;
        }
        const currentUser = await userDao.createUser(user)
        req.session['currentUser'] = currentUser
        res.json(currentUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await userDao
            .findUserByCredentials(
                credentials.username, credentials.password)
        if(existingUser) {
            req.session['currentUser'] = existingUser
            res.json(existingUser)
            return
        }
        res.sendStatus(403)
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const profile = (req, res) => {
        if (req.session['currentUser']) {
            res.send(req.session['currentUser'])
        } else {
            res.sendStatus(403)
        }
    }
    

    const findUserById = async (req, res) => {
        const uid = req.params.uid
        const user = await userDao.findUserById(uid)
        if (user) {
            res.json(user)
            return
        }
        res.sendStatus(404)
    }

    const follow = async (req, res) => {
        const uid = req.params.uid;
        const fid = req.body;
        const user = await userDao.follow(uid, fid)
        res.json(user)
    }

    const unfollow = async (req, res) => {
        const uid = req.params.uid;
        const fid = req.body;
        const user = await userDao.unfollow(uid, fid)
        res.json(user)
    }

    const getWhoToFollow = async (req, res)=> {
        const uid = req.params.uid;
        const whoToFollowArray = await userDao.getWhoToFollow(uid)
        res.json(whoToFollowArray);
    }
    const getFollowees = async (req, res)=> {
        const uid = req.params.uid;
        const followees = await userDao.getFollowees(uid)
        res.json(followees);
    }
    
    app.get('/users', findAllUsers)
    app.get('/users/:uid', findUserById)
    app.get('/users/tofollow/:uid', getWhoToFollow)
    app.post('/users', createUser)
    app.post('/users/follow/:uid', follow)
    app.post('/users/unfollow/:uid', unfollow)
    app.put('/users/:uid', updateUser)
    app.delete('/users/:uid', deleteUser)
    app.get('/users/follow/:uid', getFollowees)
    app.post('/register', register)
    app.post('/login', login)
    app.post('/logout', logout)
    app.post('/profile/:uid', profile)

}

export default UsersController