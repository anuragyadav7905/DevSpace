const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('http://localhost:3000/');
        }
    );

    app.get('/api/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
