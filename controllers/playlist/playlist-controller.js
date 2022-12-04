import mongoose from 'mongoose'
import * as playlistDao from './playlists-dao.js'


const PlaylistsController = (app) => {

    const findAllPlaylists = async (req, res) => {
        const users = await playlistDao.findAllPlaylists()
        res.json(users)
    }
    const createPlaylist = async (req, res) => {
        const newPlaylist = req.body;
        const actualPlaylist = await playlistDao.createPlaylist(newPlaylist)
        res.json(actualPlaylist);
    }
    const updatePlaylist = () => {}
    const deletePlaylist = () => {}


    const findPlaylistById = async (req, res) => {
        const pid = req.params.pid
        const playlist = await playlistDao.findPlaylistById(pid)
        if (playlist) {
            res.json(playlist)
            return
        }
        res.sendStatus(404)
    }

    const findPlaylistByName = async (req, res) => {
        const name = req.params.name
        const playlist = await playlistDao.findPlaylistByName(name)
        if (playlist) {
            res.json(playlist)
            return
        }
        res.sendStatus(404)
    } 

    const findPlaylistsForUser = async (req, res) => {
        const uid = new mongoose.Types.ObjectId(req.params.uid);
        const playlists = await playlistDao.findPlaylistsForUser(uid)
        res.json(playlists);
    }

    app.get('/playlists', findAllPlaylists)
    app.get('/playlists/users/:uid', findPlaylistsForUser)
    app.get('/playlists/:pid', findPlaylistById)
    app.get('/playlists/name/:name', findPlaylistByName)
    app.post('/playlists', createPlaylist)
    app.put('/playlists/:pid', updatePlaylist)
    app.delete('/playlists/:pid', deletePlaylist)
}

export default PlaylistsController