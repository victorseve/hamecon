var Tag = require('../models/tag');

var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all tags.
exports.tag_list = function(req, res) {
    Tag.find({})
      .populate('book')
      .exec(function (err, list_tags) {
        if (err) {return console.log(err)};
        res.render('tag/tag_list', { title: 'Tag List', tag_list: list_tags});
      });
};

// Display tag details
exports.tag_detail = function(req, res) {
    Tag.findById(req.params.id, (err, tag) => {
        if (err) {return console.log(err)};
        res.render('tag/tag_detail', {tag: tag})
    })
};

// New tag form GET.
exports.tag_create_get = function(req, res) {
    console.log('get tag form')
    res.render('tag/tag_form')
};

// New tag form POST.
exports.tag_create_post = function(req, res) {
    console.log('post tag form')
    let tag = new Tag({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    })
    console.log('new tag', tag)

    tag.save(function(err) {
        if (err) { return console.log(err) }
        res.render('tag/tag_success')
    })
};

// Tag MODIFY
exports.tag_update_post = function(req, res) {
    var updated_tag = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    }
    Tag.findByIdAndUpdate(req.params.id, updated_tag, (err, tag) => {
        if (err) { return console.log(err); }
        res.render('tag/tag_success')
    });
}

// Tag DELETE
exports.tag_delete_post = function(req, res) {
    console.log('going to delete tag');
    Tag.findByIdAndRemove(req.body._id, function deleteTag(err) {
        if (err) { return next(err); }
        // Success - go to author list
        console.log('Deleted tag with id', req.body._id, req.body)
        res.redirect('/tags')
    })
}