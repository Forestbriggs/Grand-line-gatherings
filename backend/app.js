// * Required packages 
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// * Check if environment is production
const { environment } = require('./config');
const isProduction = environment === 'production';

// * Initialize express app
const app = express();

// * Initialize middlewares

// * Logs info about requests and responses 
app.use(morgan('dev'));

// * Parse cookies and JSON requests
app.use(cookieParser());
app.use(express.json());

// * Security middleware
if (!isProduction) {
    // * Only enable cors in development
    app.use(cors());
}

// * Sets variety of headers to better secure app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// * Sets _csrf token and creates req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "lax",
            httpOnly: true
        }
    })
);