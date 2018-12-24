var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    image: {type: String}
});

TagSchema
.virtual('url')
.get(function () {
  return '/library/tag/' + this._id;
});

//Export model
module.exports = mongoose.model('Tag', TagSchema);