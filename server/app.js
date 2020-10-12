'use strict';

const express = require('express');

const app = express();
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const server = require('./');

// logging middleware
app.use(morgan('dev'));

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const setCache = function (req, res, next) {
    // here you can define period in second, this one is 1 minutes
    const period = 60 * 1

    // cache for GET requests
    if (req.method == 'GET') {
        res.set('Cache-control', `public, max-age=${period}`)
    } else {
        // for the other requests set strict no caching parameters
        res.set('Cache-control', `no-store`)
    }
    // remember to call next() to pass on the request
    next()
}

// now call the new middleware function in your app

app.use(setCache);

// prepend '/api' to URIs
app.use('/api', server);

// serve static files from public
app.use(express.static(path.join(__dirname, '..', 'build')));

// request any page and receive index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')));

const httpServer = http.createServer(app);
// server listening!
httpServer.listen(process.env.PORT || 3000, () => {
    console.log(chalk.cyan('Server is listening'), chalk.yellow('http://localhost:3000'));
});

