var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    date_of_birth: {type: Date, required: true},
    date_of_death: {type: Date},
    image: {type: String, required: true}
}, { timestamps: true });

AuthorSchema
.virtual('name')
.get(function () {
  return this.first_name + ' ' + this.last_name;
});

AuthorSchema
.virtual('url')
.get(function () {
  return '/library/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);