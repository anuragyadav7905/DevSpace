const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5001/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({ googleId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);
                }

                const user = await new User({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
                    avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : ''
                }).save();
                done(null, user);
            } catch (err) {
                console.error('Error in Google Strategy:', err);
                done(err, null);
            }
        }
    )
);
