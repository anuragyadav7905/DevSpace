const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
    avatar: String,
    notes: { type: String, default: "" }
});

mongoose.model('users', userSchema);
