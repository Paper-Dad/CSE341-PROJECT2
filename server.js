const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Z-Key']
}));

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : 'logged out'); });

app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs'
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `caught exception: ${err}\n` + `exception origin: ${origin}`);
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