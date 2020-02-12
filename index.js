// code away!
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());

server.use(helmet());

server.use('/api/posts', postRouter);

module.exports = server;
