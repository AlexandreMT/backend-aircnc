const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const env = require('./enviroments/env');

const app = express();

databaseUserCredential = env.databaseCredentials.user;
databasePasswordCredential = env.databaseCredentials.password;
databaseURLConnection = `mongodb+srv://${databaseUserCredential}:${databasePasswordCredential}@cluster0-hdwpb.mongodb.net/aircnc?retryWrites=true&w=majority`;

mongoose.connect(databaseURLConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);