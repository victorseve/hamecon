var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepecheSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    tag: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamps: true });

// Virtual for book's URL
DepecheSchema
.virtual('url')
.get(function () {
  return '/depeche/' + this._id;
});

//Export model
module.exports = mongoose.model('Depeche', DepecheSchema);