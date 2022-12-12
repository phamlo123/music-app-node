import mongoose from 'mongoose'
import * as songDao from './songs-dao.js'

const SongsController = (app) => {
    const findAllSongs = async (req, res) => {
        const songs = await songDao.findAllSongs()
        res.json(songs)
    }
    const createSong = async (req, res) => {
        const song = req.body;
        const actualSong = await songDao.createSong(song)
        res.json(actualSong);
    }
    const updateSong = async (req, res) => {
        const sid = req.params.sid;
        const newSong = req.body
        const update_status = await songDao.updateSong(sid, newSong)
        res.json(update_status)
    }
    const deleteSong = async (req, res) => {
        const sid = req.params.sid;
        const status = await songDao.deleteSong(sid)
        res.json(status)
    }


    const findSongById = async (req, res) => {
        const sid = req.params.sid
        const song = await songDao.findSongById(sid)
        if (song) {
            res.json(song)
            return
        }
        res.sendStatus(404)
    }

    const findSongByName = async (req, res) => {
        const name = req.params.name
        const song = await songDao.findSongByName(name)
        if (song) {
            res.json(song)
            return
        }
        res.sendStatus(404)
    } 
    const findSongWithNameContains = async (req, res) => {
        const name = req.params.name
        const songs = await songDao.findSongWithNameContains(name)
        if (songs) {
            res.json(songs)
            return
        }
        res.sendStatus(404)
    }


    app.get('/songs', findAllSongs)
    app.get('/songs/:sid', findSongById)
    app.get('/songs/name/:name', findSongByName)
    app.get('/songs/contains/:name', findSongWithNameContains)
    app.post('/songs', createSong)
    app.put('/songs/:sid', updateSong)
    app.delete('/songs/:pid', deleteSong)
}
export default SongsController;