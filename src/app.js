const express = require('express');
const cors = require('cors');
const sessionConfig = require('./config/session');
const app = express();

// configuraçao de modulos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(sessionConfig);

app.use('/usuario', require('./routes/usuario-route'));



module.exports = app;
