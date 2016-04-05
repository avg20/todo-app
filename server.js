'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./server/auth');
const demon = require('./server/demon');
const dbURI = `${process.env.DB_HOST}/todo`;
const app = express();

if (!mongoose.connection.db) {
  mongoose.connect(dbURI, (err) => {
    if (err) throw err;
  });
}

app.set('port', process.env.PORT);
app.use('/', express.static('public'));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth.init);

demon();
require('./server/router/index')(app);

app.listen(app.get('port'), () => {
  console.log(`Visit: http://localhost:${app.get('port')}`); // eslint-disable-line
});

