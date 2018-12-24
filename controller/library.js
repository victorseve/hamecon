var Author = require('../models/author');
var Tag = require('../models/tag');
var Book = require('../models/book');

exports.tag_get = function(req, res) {
    console.log('trying to get tags');
    Tag.find({}, (err, tags) => {
        if (err) { return console.log(err) };
        console.log(tags);
        res.send(JSON.stringify(tags));
    })
}

exports.author_get = function(req, res) {
    console.log('trying to get authors')
    Author.find({}, (err, authors) => {
        console.log(authors);
        if (err) { return console.log(err) };
        res.send(JSON.stringify(authors));
    })
}