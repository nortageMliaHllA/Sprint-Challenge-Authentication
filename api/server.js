const express = require('express');
const cors = require('cors');
const helmet = require('helmet');



const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionOptions));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req, res) => {
    res.send('Target acquired!');
});


const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session);

const sessionOptions = {
    name: 'cookiemonster',
    secret: 'yum yum eatem up',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('../database/dbConfig'),
        tablename: 'sessions',
        sid: sid,
        createTable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionOptions));


module.exports = server;
