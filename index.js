import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import session from 'express-session'

import UserController from "./controllers/user/user-controller.js"
import PlaylistsController from "./controllers/playlist/playlist-controller.js";
import SongsController from "./controllers/song/songs-controller.js";
import ReviewsController from "./controllers/reviews/reviews-controller.js";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/music'
mongoose.connect(CONNECTION_STRING);

const app = express()

app.use(cors({
    credentials: true,
    origin: ['https://rate-my-playlists.netlify.app', 'https://ratemyplaylists.herokuapp.com']
}))
app.use(session({
    secret: 'should be an environment variable',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.json());
UserController(app)
PlaylistsController(app)
SongsController(app)
ReviewsController(app)

app.listen(process.env.PORT || 4000);