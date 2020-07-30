const path = require('path'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    sqlrouting = require('../routes/sqlrouting');

var auth = require('../routes/auth');

module.exports.init = () => {

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    app.disable('etag')

    // body parsing middleware
    app.use(bodyParser.json());

    // add a router
    app.use('/api/', sqlrouting);

    //Passport
    app.use('/auth', auth);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

