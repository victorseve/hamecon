var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    content: {type: String, required: true},
}, { timestamps: true });

// Virtual for book's URL
NoteSchema
.virtual('url')
.get(function () {
  return '/library/note/' + this._id;
});

//Export model
module.exports = mongoose.model('Note', NoteSchema);