const request = require('supertest');
const app = require('../server');
const mongodb = require('../data/database');

beforeAll((done) => {
    mongodb.initDb((err) => {
        if (err) {
            done(err);
        } else {
            done();
        }
    });
});

describe('GET endpoints', () => {
//CHARACTERS//
    test('GET /characters should return all characters', async () => {
        const response = await request(app).get('/characters');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /characters/:id should return one character', async () => {
        const allCharacters = await request(app).get('/characters');

        expect(allCharacters.statusCode).toBe(200);
        expect(allCharacters.body.length).toBeGreaterThan(0);

        const characterId = allCharacters.body[0]._id;

        const response = await request(app).get(`/characters/${characterId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('nation');
        expect(response.body).toHaveProperty('bendingType');
        expect(response.body).toHaveProperty('description');
    });
//EPISODES//
    test('GET /episodes should return all episodes', async () => {
        const response = await request(app).get('/episodes');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /episodes/:id should return one episode', async () => {
        const allEpisodes = await request(app).get('/episodes');

        expect(allEpisodes.statusCode).toBe(200);
        expect(allEpisodes.body.length).toBeGreaterThan(0);

        const episodeId = allEpisodes.body[0]._id;

        const response = await request(app).get(`/episodes/${episodeId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('book');
        expect(response.body).toHaveProperty('episode');
        expect(response.body).toHaveProperty('description');
    });
//NATIONS//
    test('GET /nations should return all nations', async () => {
        const response = await request(app).get('/nations');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /nations/:id should return one nation', async () => {
        const allNations = await request(app).get('/nations');

        expect(allNations.statusCode).toBe(200);
        expect(allNations.body.length).toBeGreaterThan(0);

        const nationId = allNations.body[0]._id;

        const response = await request(app).get(`/nations/${nationId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('capital');
        expect(response.body).toHaveProperty('government');
        expect(response.body).toHaveProperty('culture');
        expect(response.body).toHaveProperty('notableCharacters');
        expect(response.body).toHaveProperty('description');
    });
//USERS//
    test('GET /users should return all users', async () => {
        const response = await request(app).get('/users');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /users/:id should return one user', async () => {
        const allUsers = await request(app).get('/users');

        expect(allUsers.statusCode).toBe(200);
        expect(allUsers.body.length).toBeGreaterThan(0);

        const userId = allUsers.body[0]._id;

        const response = await request(app).get(`/users/${userId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('firstName');
        expect(response.body).toHaveProperty('lastName');
        expect(response.body).toHaveProperty('role');
        expect(response.body).toHaveProperty('favoriteCharacter');
    });
});