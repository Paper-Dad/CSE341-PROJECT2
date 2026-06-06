const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Nations']
    try {
        const db = mongodb.getDb().db('project2').collection('avatarNations').find();
        const nations = await db.toArray();
        res.status(200).json(nations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Nations']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid nation ID' });
        }
        const id = new ObjectId(req.params.id);
        const db = mongodb.getDb().db('project2').collection('avatarNations');
        const nation = await db.findOne({ _id: id });
        if (!nation) {
            return res.status(404).json({ message: 'Nation not found' });
        }
        res.status(200).json(nation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createNation = async (req, res) => {
    // #swagger.tags = ['Nations']
    try {
        const newNation = {
            name: req.body.name,
            capital: req.body.capital,
            government: req.body.government,
            culture: req.body.culture,
            notableCharacters: req.body.notableCharacters,
            description: req.body.description
        };

        const db = mongodb.getDb().db('project2').collection('avatarNations');
        const result = await db.insertOne(newNation);

        res.status(201).json({
            _id: result.insertedId,
            ...newNation
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateNation = async (req, res) => {
    // #swagger.tags = ['Nations']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid nation ID' });
        }
        const id = new ObjectId(req.params.id);
        const updatedNation = {
            name: req.body.name,
            capital: req.body.capital,
            government: req.body.government,
            culture: req.body.culture,
            notableCharacters: req.body.notableCharacters,
            description: req.body.description
        };

        const db = mongodb.getDb().db('project2').collection('avatarNations');
        const result = await db.replaceOne({ _id: id }, updatedNation);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Nation not found' });
        }

        res.status(200).json({
            _id: id,
            ...updatedNation
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteNation = async (req, res) => {
    // #swagger.tags = ['Nations']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid nation ID' });
        }
        const id = new ObjectId(req.params.id);
        const db = mongodb.getDb().db('project2').collection('avatarNations');
        const result = await db.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Nation not found' });
        }

        res.status(200).json({ message: 'Nation deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createNation,
    updateNation,
    deleteNation
};