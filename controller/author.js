var Author = require('../models/author');
var Book = require('../models/book');

var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all authors.
exports.author_list = function(req, res) {
    Author.find({})
      .populate('book')
      .exec(function (err, list_authors) {
        if (err) { return next(err); }
        res.render('author/author_list', { title: 'Author List', author_list: list_authors});
      });
};

// Display author details
exports.author_detail = function(req, res) {
    async.parallel({
        author: (callback) => {
            Author.findById(req.params.id, callback)
        },
        books: (callback) => {
            Book.find({author: req.params.id}, callback)
        }
    }, (err, results) => {
        if (err) { console.log(err) }
        res.render('author/author_detail', {author: results.author, books: results.books})
    });
    // Author.findById(req.params.id, (err, author) => {
    //     if (err) return next(err);
    //     res.render('author_detail', {author: author})
    // })
};

// New author form GET.
exports.author_create_get = function(req, res) {
    res.render('author/author_form')
};

// New author form POST.
exports.author_create_post = function(req, res) {

    let author = new Author({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
        image: req.body.image,
    })

    author.save(function(err) {
        if (err) { return next(err) }
        res.redirect(author.url)
    })
};

// New author form GET.
exports.author_create_pop_get = function(req, res) {
    res.render('author/author_pop_form')
};

// New author form POST.
exports.author_create_pop_post = function(req, res) {

    let author = new Author({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
        image: req.body.image,
    })
    console.log('new author', author)

    author.save(function(err) {
        if (err) { return console.log(err) }
        res.render('tag/tag_success')
    })
};

// Tag MODIFY
exports.author_update_post = function(req, res) {
    var updated_author = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
        image: req.body.image,
    }
    Author.findByIdAndUpdate(req.params.id, updated_author, (err, author) => {
        if (err) { return console.log(err); }
        res.render('tag/tag_success')
    });
}
