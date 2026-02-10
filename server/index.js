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

// Trust proxy for secure cookies on platforms like Render
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const clientUrl = (process.env.CLIENT_URL || "").replace(/\/$/, "");
    if (!origin || (origin === clientUrl) || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));
app.use(express.json());

app.use(
  session({
    name: "devspace.sid",
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
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
