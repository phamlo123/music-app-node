import mongoose from 'mongoose'
import * as playlistDao from './playlists-dao.js'


const PlaylistsController = (app) => {

    const findAllPlaylists = async (req, res) => {
        const playlists = await playlistDao.findAllPlaylists()
        res.json(playlists)
    }
    const createPlaylist = async (req, res) => {
        const newPlaylist = req.body;
        const actualPlaylist = await playlistDao.createPlaylist(newPlaylist)
        res.json(actualPlaylist);
    }
    const updatePlaylist = async (req, res) => {
        const newPlaylist = req.body;
        const pid = new mongoose.Types.ObjectId(req.params.pid);
        const status = await playlistDao.updatePlaylist(pid, newPlaylist);
        res.json(status);
    }
    const deletePlaylist = async (req, res) => {
        const pid = new mongoose.Types.ObjectId(req.params.pid);
        const status = await playlistDao.deletePlaylist(pid);
        res.json(pid);
        return
    }


    const findPlaylistById = async (req, res) => {
        const pid = new mongoose.Types.ObjectId(req.params.pid);
        const playlist = await playlistDao.findPlaylistById(pid)
        if (playlist) {
            res.json(playlist)
            return
        }
        res.sendStatus(404)
    }

    const getPlaylistsByUser = async (req, res) => {
        const uid = req.params.uid;
        const pl = await playlistDao.getPlaylistsByUser(uid);
        res.json(pl);
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

    const findFeaturedPlaylists = async (req, res) => {
        // const uid = new mongoose.Types.ObjectId(req.params.uid);
        const playlists = await playlistDao.findFeaturedPlaylists()
        res.json(playlists);
    }

    const addSongToPlaylist = async (req, res) => {
        const pid = new mongoose.Types.ObjectId(req.params.pid);
        const playlist = await playlistDao.addSongToPlaylist(pid, req.body)
        res.json(playlist);
    }
    const removeSongFromPlaylist = async (req, res) => {
        const pid = new mongoose.Types.ObjectId(req.params.pid);
        const playlist = await playlistDao.removeSongFromPlaylist(pid, req.body)
        res.json(playlist);
    }


    app.get('/playlists/users', findFeaturedPlaylists)
    app.get('/playlists', findAllPlaylists)
    app.get('/playlists/users/:uid', findPlaylistsForUser)
    app.get('/playlists/users/by/:uid', getPlaylistsByUser)
    app.get('/playlists/:pid', findPlaylistById)
    app.get('/playlists/name/:name', findPlaylistByName)
    app.post('/playlists', createPlaylist)
    app.put('/playlists/:pid', updatePlaylist)
    app.delete('/playlists/:pid', deletePlaylist)
    app.post('/playlists/addSong/:pid', addSongToPlaylist)
    app.patch('/playlists/removeSong/:pid', removeSongFromPlaylist)

}

export default PlaylistsController