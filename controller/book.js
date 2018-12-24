var Book = require('../models/book');
var Author = require('../models/author');
var Tag = require('../models/tag');
var Note = require('../models/notes');

var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all books.
exports.book_list = function(req, res) {
    var perPage = 20;
    var page = req.params.page || 1
    Book.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .populate('author')
    .populate('tag')
    .exec(function (err, list_books) {
        if (err) { return console.log(err) }
        Book.count().exec(function(err, count) {
            if (err) { return console.log(err) }
            res.render('book/book_list', { 
                title: 'Book List', book_list: list_books, 
                current:page, pages: Math.ceil(count / perPage)
            });   
        });
    });
};

// Display book details

exports.book_detail = function(req, res) {

    async.parallel({
        book: function(callback) {
            Book.findById(req.params.id)
              .populate('author')
              .populate('tag')
              .populate('note')
              .exec(callback);
        },
        note: function(callback) {
            Note.findOne({book: req.params.id})
                .exec(callback)
        }
    }, function(err, results) {
        if (err) { return console.log(err); }
        if (results.book==null) { 
            var err = new Error('Media not found');
            err.status = 404;
            return console.log(err);
        }
        res.render('book/book_detail', { book: results.book, note: results.note } );
    });
    // Book.findById(req.params.id, (err, book) => {
    //     if (err) { return console.log(err) }
    //     res.render('book/book_detail', {book: book})
    // })
};

// New book form GET.
exports.book_create_get = function(req, res) {
    console.log('going to get book')
    async.parallel({
        authors: (callback) => {
            Author.find().sort({last_name: 1}).exec(callback);
        },
        tags: (callback) => {
            Tag.find().sort({name: 1}).exec(callback);
        }
    }, (err, results) => {
        if (err) { return console.log(err) }
        console.log('going to render the template')
        res.render('book/book_form', { book: {}, authors: results.authors, tags: results.tags })
    })
};

// New book form POST.
exports.book_create_post = function(req, res) {

    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        image: req.body.image,
        published: req.body.published,
        summary: req.body.summary,
        tag: req.body.tag,
    })

    book.save(function(err) {
        if (err) { return console.log(err) }
        res.redirect(book.url)
    })
};

// Book update GET.
exports.book_update_get = function(req, res) {
    console.log('going to get book')
    async.parallel({
        book: (callback) => {
            Book.findById(req.params.id)
            .populate('author')
            .populate('tag')
            .exec(callback)
        },
        authors: (callback) => {
            Author.find().sort({last_name: 1}).exec(callback);
        },
        tags: (callback) => {
            Tag.find().sort({name: 1}).exec(callback);
        }
    }, (err, results) => {
        if (err) { return console.log(err) }
        console.log('going to render the template')
        res.render('book/book_form', { book: results.book, authors: results.authors, tags: results.tags })
    })
};

// Book update POST.
exports.book_update_post = function(req, res) {

    let updated_book = {
        title: req.body.title,
        author: req.body.author,
        image: req.body.image,
        published: req.body.published,
        summary: req.body.summary,
        tag: req.body.tag,
    }

    Book.findByIdAndUpdate(req.params.id, updated_book, function(err, book) {
        if (err) { return console.log(err) }
        res.redirect(book.url)
    })
};