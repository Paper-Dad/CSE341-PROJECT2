const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    next();
});

app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, 'caught exception: ${err}\n' + 'exception origin: ${origin}');
});

mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to connect to the database. Exiting...');
        process.exit(1);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node is running on http://localhost:${port}`);
        });
    }
});