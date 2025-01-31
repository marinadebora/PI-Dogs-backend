const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const index = require('./routes/index');
require('./dataBase'); 

const server = express();

// Middlewares globales
server.use(cors());
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(helmet());
server.use(morgan('dev'));

// Rutas
server.use('/', index);

// Manejo de errores global
server.use((err, req, res, next) =>
{
  console.error(err.stack); // Muestra el error en consola
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Error interno del servidor',
  });
});

module.exports = server;