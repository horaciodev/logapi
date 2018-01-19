const bluebird = require('bluebird');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = bluebird;

  var errorRecordModel = new Schema({
    appId: String,
    errorDescr: String,
    sourceHost: String,
    utcDateTime: { type: Date, default: Date.now }
  });

/*
third parameter is important if you don't want mongoose to pluralize the name
of your collection
*/
  var errSchema = mongoose.model('errorRecord', errorRecordModel,'errorRecord');
  module.exports = errSchema;
