require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const widgetRouter = require('./routes/widget');
const { authenticationMiddleware } = require('./utils/middleware');
const { database } = require('./database');

const app = express();

const clientsOrigin = database.map((client) => client.origin);

app.use(express.json());
app.use(
  cors({
    origin: (origin, cb) => {
      if (clientsOrigin.indexOf(origin) !== -1) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET',
  })
);
app.use(helmet());

app.use('/businesses', authenticationMiddleware, widgetRouter);

app.listen(3001, () => console.log('server running in port 3001'));

module.exports = app;
