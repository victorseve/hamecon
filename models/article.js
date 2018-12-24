var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment')

var ArticleSchema = new Schema({
    site_name: {type: String, required: true},
    article_url: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    published_time: {type: String, required: true},
    content: {type: String, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  }, { timestamps: true });

// Virtual for book's URL
ArticleSchema
    .virtual('url')
    .get(function () {
    return '/article/' + this._id;
});

ArticleSchema
    .virtual('published_date')
    .get(function () {
    return moment(this.published_time).format('LLL');
});

//Export model
module.exports = mongoose.model('Article', ArticleSchema);