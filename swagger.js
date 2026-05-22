const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Characters API',
        description: 'API characters project'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/characters.js', './routes/episodes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);