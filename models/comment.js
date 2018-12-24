var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    username: {type: String, required: true},
    message: {type: String, required: true},
  }, { timestamps: true });

//Export model
module.exports = mongoose.model('Comment', CommentSchema);