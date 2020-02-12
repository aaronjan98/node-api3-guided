const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();


server.use(express.json());
server.use(morgan('deve'));
server.use(helmet());
server.use(logger);
// server.use(gatekeeper);

server.use('/api/hubs', gatekeeper, hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';
  
  res.send(`
  <h2>Lambda Hubs API</h2>
  <p>Welcome${nameInsert} to the Lambda Hubs API</p>
  `);
});

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
}

function gatekeeper(req, res, next) {
  const password = req.headers.password;

  if( password!== 'mellon'){
    res.status(401).json({ error: 'not authorized' });
  }else {
    next();
  }
}

module.exports = server;

// write a gatekeeper middleware that reads a password from req.headers
// if the password is "mellon" let the request continue
// if the password is not "mellon" send a 400 status code and a message to the client