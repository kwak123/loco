const mongoose = require('mongoose');
const UserSchema = require('../models/user');
const ComplaintSchema = require('../models/complaint');

const DB_CREDENTIALS = require('../env/key.js').mongo_creds;

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('mongo loaded'));

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'prod') {
  mongoose.connect(DB_CREDENTIALS);
} else {
  mongoose.connect('mongodb://localhost/loco');
}

module.exports = {
  mongoose,
  db
};