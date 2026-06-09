const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const db = mongodb.getDb().db('project2').collection('avatarUsers').find();
        const users = await db.toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const id = new ObjectId(req.params.id);
        const db = mongodb.getDb().db('project2').collection('avatarUsers');
        const user = await db.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const newUser = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            favoriteCharacter: req.body.favoriteCharacter
        };

        const db = mongodb.getDb().db('project2').collection('avatarUsers');
        const result = await db.insertOne(newUser);

        res.status(201).json({
            _id: result.insertedId,
            ...newUser
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const id = new ObjectId(req.params.id);
        const updatedUser = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            favoriteCharacter: req.body.favoriteCharacter
        };

        const db = mongodb.getDb().db('project2').collection('avatarUsers');
        const result = await db.replaceOne({ _id: id }, updatedUser);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            _id: id,
            ...updatedUser
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const id = new ObjectId(req.params.id);
        const db = mongodb.getDb().db('project2').collection('avatarUsers');
        const result = await db.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};