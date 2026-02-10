const passport = require('passport');

module.exports = app => {
    // Define the client URL based on the environment
    const CLIENT_URL = process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:3000';

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login',
            session: true
        }),
        (req, res) => {
            // Successful authentication, redirect to client
            res.redirect(CLIENT_URL);
        }
    );

    app.get('/api/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) { return next(err); }
            // Redirect to client after logout
            res.redirect(CLIENT_URL);
        });
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
