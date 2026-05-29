const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']

    if (req.session.user) {
        res.send(`Logged in as ${req.session.user.username}`);
    } else {
        res.send('Logged out');
    }
});

router.use('/characters', require('./characters'));
router.use('/episodes', require('./episodes'));

router.get('/login', passport.authenticate('github'), (req, res) => {
    // This function will not be called as the request will be redirected to GitHub for authentication
});

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;