const express = require('express');
const server = express();
const cors = require('cors');
const morgan = require('morgan');

// const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

// Configure your server here
server.use(express.json());
server.use(morgan('tiny'));
server.use(cors());
// server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);


server.get('/', (req, res) => {
    res.send(`<h3>Server is currently working!</h3>`)
});

module.exports = server;
