const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Characters']
    try {
        const db = mongodb.getDb().db('project2').collection('avatarCharacters').find();
        const characters = await db.toArray();
        res.status(200).json(characters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Characters']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid character ID' });
        }
        const id = new ObjectId(req.params.id);
        const db = mongodb.getDb().db('project2').collection('avatarCharacters');
        const character = await db.findOne({ _id: id });
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }
        res.status(200).json(character);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createCharacter = async (req, res) => {
    // #swagger.tags = ['Characters']
    try {
        const newCharacter = {
            name: req.body.name,
            nation: req.body.nation,
            bendingType: req.body.bendingType,
            role: req.body.role,
            age: req.body.age,
            firstAppearance: req.body.firstAppearance,
            description: req.body.description
        };

        const db = mongodb.getDb().db('project2').collection('avatarCharacters');
        const result = await db.insertOne(newCharacter);

        res.status(201).json({
            _id: result.insertedId,
            ...newCharacter
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCharacter = async (req, res) => {
    // #swagger.tags = ['Characters']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid character ID' });
        }
        const id = new ObjectId(req.params.id);
        const updatedCharacter = {
            name: req.body.name,
            nation: req.body.nation,
            bendingType: req.body.bendingType,
            role: req.body.role,
            age: req.body.age,
            firstAppearance: req.body.firstAppearance,
            description: req.body.description
        };

        const db = mongodb.getDb().db('project2').collection('avatarCharacters');
        const result = await db.replaceOne({ _id: id }, updatedCharacter);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Character not found' });
        }

        res.status(200).json({
            _id: id,
            ...updatedCharacter
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteCharacter = async (req, res) => {
    // #swagger.tags = ['Characters']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid character ID' });
        }
        const id = new ObjectId(req.params.id);
        const db = mongodb.getDb().db('project2').collection('avatarCharacters');
        const result = await db.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Character not found' });
        }

        res.status(200).json({ message: 'Character deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCharacter,
    updateCharacter,
    deleteCharacter
};