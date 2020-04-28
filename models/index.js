const mongoose = require('mongoose');

const { Schema } = mongoose;
const { MONGO_CONN } = process.env;

mongoose.connect(MONGO_CONN, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const urlSchema = require('./url')(Schema);

const urlModel = mongoose.model('Url', urlSchema);

module.exports = { urlModel };
