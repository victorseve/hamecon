var Note = require('../models/notes');
var Book = require('../models/book');

var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all books.
exports.note_list = function(req, res) {
    Note.find({})
      .populate('book')
      .exec(function (err, list_notes) {
        if (err) { return console.log(err) }
        res.render('notes/notes_list', { title: 'Note list', note_list: list_notes});
      });
};

// Display book details
exports.note_detail = function(req, res) {

    Note.findById(req.params.id)
        .populate('book')
        .exec(function(err, note) {
        if (err) { return console.log(err); }
        if (note==null) { 
            var err = new Error('Media not found');
            err.status = 404;
            return console.log(err);
        }
        res.render('notes/notes_detail', { note: note } );
    });
};

// New book form GET.
exports.note_create_get = function(req, res) {
    var url_split = req.get('referer').split('/')
    var book_id = url_split[url_split.length-1]
    console.log('Origin', book_id  )
    res.render('notes/notes_form', { note: {}, book_id: book_id})
};

// New book form POST.
exports.note_create_post = function(req, res) {
    console.log(req.body.book_id)
    let note = new Note({
        book: req.body.book_id,
        content: req.body.content,
    })

    note.save(function(err) {
        if (err) { return console.log(err) }
        res.redirect(note.url)
    })
};

// Note update GET.
exports.note_update_get = function(req, res) {
    Note.findById(req.params.id, (err, note) => {
        if (err) { return console.log(err) }
        res.render('notes/notes_form', { note: note, book_id: note.book})
    })
};

// Note update POST.
exports.note_update_post = function(req, res) {
    Note.findByIdAndUpdate(req.params.id, { $set: { content: req.body.content }}, function(err, note) {
        if (err) { return console.log(err) }
        res.redirect(note.url)
    })
};