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

    app.get('/api/logout', (req, res) => {
        req.logout((err) => {
            if (err) { return res.status(500).json({ error: 'Logout failed' }); }
            req.session.destroy((err) => {
                if (err) { return res.status(500).json({ error: 'Session destruction failed' }); }
                res.clearCookie('devspace.sid', { path: '/' }); // Clear session cookie
                res.status(200).json({ success: true });
            });
        });
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
