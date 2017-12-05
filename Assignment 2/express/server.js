var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

const PORT = 7700;

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('*', cors({ origin: 'http://localhost:7700' }));


// Authorization
server.use(function (req, res, next) {
    if(req.header("Authorization") === 'secret') {
        next()
    } else {
        res.status(401).send('Unauthorized');
    }
});


// Swagger
var swagger = require("swagger-n");
var spec = require('./src/swagger/swagger.json');
var handlers = require('./src/swagger/handlers');
server.use(swagger.router(spec, handlers));

// SWAGGER UI SETUP
server.use(express.static(path.join(__dirname, 'public')));
server.use('/swagger', express.static(path.join(__dirname, 'node_modules/swagger-ui/dist')));


// GraphQL
import {
    graphqlExpress,
    graphiqlExpress,
} from 'graphql-server-express';
import { schema } from './src/graphql/schema';
server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));


// catch 404 and forward to error handler
server.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
server.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        error: err
    });
});

server.listen(PORT, () => {
    console.log('Server is now running on http://localhost:7700');
});
