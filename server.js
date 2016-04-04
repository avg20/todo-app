'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./server/auth');
const demon = require('./server/demon');
const config = require('./server/config');
const dbURI = config.dbHost;
const app = express();

if (!mongoose.connection.db) {
  mongoose.connect(dbURI, (err) => {
    if (err) throw err;
  });
}

app.set('port', config.port);
app.use('/', express.static('public'));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth.init);

demon();
require('./server/router/index')(app);

app.listen(app.get('port'), () => {
  console.log(`Visit: ${config.host}`); // eslint-disable-line
});

