var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
}, { toJSON: { virtuals: true }, toObject: { virtuals: true }});

UserSchema
.virtual('name')
.get(function () {
  return this.username.charAt(0).toUpperCase() + this.username.slice(1);
});

//Export model
module.exports = mongoose.model('User', UserSchema);