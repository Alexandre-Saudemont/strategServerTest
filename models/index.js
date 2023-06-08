const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//here it's to put all the models in the db
//like centralizing all the models in one place
const db = {};

db.mongoose = mongoose;
db.user = require('./user.model.js');

export default db;
