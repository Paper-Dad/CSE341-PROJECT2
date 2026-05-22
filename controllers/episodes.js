const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Episodes']
    try {
        const db = mongodb.getDb().db('project2').collection('avatarEpisodes').find();
        const episodes = await db.toArray();
        res.status(200).json(episodes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Episodes']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid episode ID' });
        }
        const id = new ObjectId(req.params.id);
        const db = mongodb.getDb().db('project2').collection('avatarEpisodes');
        const episode = await db.findOne({ _id: id });
        if (!episode) {
            return res.status(404).json({ message: 'Episode not found' });
        }
        res.status(200).json(episode);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createEpisode = async (req, res) => {
    // #swagger.tags = ['Episodes']
    try {
        const newEpisode = {
            title: req.body.title,
            book: req.body.book,
            episode: req.body.episode,
            description: req.body.description
        };

        const db = mongodb.getDb().db('project2').collection('avatarEpisodes');
        const result = await db.insertOne(newEpisode);

        res.status(201).json({
            _id: result.insertedId,
            ...newEpisode
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateEpisode = async (req, res) => {
    // #swagger.tags = ['Episodes']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid episode ID' });
        }
        const id = new ObjectId(req.params.id);
        const updatedEpisode = {
            title: req.body.title,
            book: req.body.book,
            episode: req.body.episode,
            description: req.body.description
        };

        const db = mongodb.getDb().db('project2').collection('avatarEpisodes');
        const result = await db.replaceOne({ _id: id }, updatedEpisode);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Episode not found' });
        }

        res.status(200).json({
            _id: id,
            ...updatedEpisode
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteEpisode = async (req, res) => {
    // #swagger.tags = ['Episodes']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid episode ID' });
        }
        const id = new ObjectId(req.params.id);
        const db = mongodb.getDb().db('project2').collection('avatarEpisodes');
        const result = await db.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Episode not found' });
        }

        res.status(200).json({ message: 'Episode deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createEpisode,
    updateEpisode,
    deleteEpisode
};