const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const sanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

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
        store: new MongoStore({
            url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster.glwj2.mongodb.net/surface?retryWrites=true&w=majority`
        }),
        cookie: {
            maxAge: max_age,
            sameSite: true,
            secure: !DEV
        }
    })
);

// Sanitize data
app.use(sanitize());

//Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});
app.use(limiter);

// Prevent http params pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build'));
});

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
app.get('/*', (req, res) =>
    res.status(404).json({
        error: true,
        errorMessage: 'The page you are looking for does not exist'
    })
);
app.post('/*', (req, res) =>
    res.status(404).json({
        error: true,
        errorMessage: 'The page you are looking for does not exist'
    })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on port ${PORT}`);
});
