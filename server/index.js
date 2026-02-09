const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

require('./models/User'); // Must be loaded before passport
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json());

app.use(
  session({
    name: "devspace.sid",
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devspace')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
require('./routes/authRoutes')(app);
app.use('/api/projects', require('./routes/projects'));
app.use('/api/freelance', require('./routes/freelance'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/export', require('./routes/export'));

app.get('/', (req, res) => {
  res.send('DevSpace API Running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
