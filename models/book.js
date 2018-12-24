var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    image: {type: String, required: true},
    published: {type: Date},
    summary: {type: String, required: true},
    tag: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
}, { timestamps: true });

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/library/book/' + this._id;
});

BookSchema
.virtual('published_date')
.get(function () {
  return moment(this.published).format('YYYY');
});

//Export model
module.exports = mongoose.model('Book', BookSchema);