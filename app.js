const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const logger = require('morgan');

const config_path = path.resolve(__dirname, 'config.env');
dotenv.config({ path: config_path });

// API version
const api = process.env.API_VERSION;

// Routes import
const auth = require('./routes/auth');
const user = require('./routes/user');
const post = require('./routes/post');

// Database
const db = require('./db/db');
db();

const app = express();

// Session management
const { EXPIRES_TIME, NAME, SECRET, DEV } = process.env;
const max_age = EXPIRES_TIME * 60 * 60 * 24 * 1000;

app.use(
    session({
        name: NAME,
        secret: SECRET,
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: max_age,
            sameSite: true,
            secure: !DEV
        }
    })
);

// Logger
app.use(logger('dev'));

// MIDDLEWARE
// Body parser
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Routes
app.use(`${api}/auth`, auth);
app.use(`${api}`, user);
app.use(`${api}/post`, post);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on port ${PORT}`);
});
