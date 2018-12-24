var Depeche = require('../models/depeche');
var Tag = require('../models/tag');

exports.depeche_list = function(req, res) {
    var perPage = 5;
    var page = req.params.page || 1
    Depeche.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .populate('author')
    .populate('tag')
    .sort({'createdAt': -1})
    .exec(function (err, depeches) {
        if (err) { return console.log(err) }
        Depeche.count().exec(function(err, count) {
            if (err) { return console.log(err) }
            res.render('depeche/depeche_list', { 
                depeche_list: depeches, 
                current:page, pages: Math.ceil(count / perPage)
            });   
        });
    });
};

// GET depeche create.
exports.depeche_create_get = function(req, res) {
    Tag.find({}, (err, tags) => {
        console.log(tags)
        if (err) { return console.log(err) }
        res.render('depeche/depeche_form', {tags: tags});
    })
};

// POST depeche create.
exports.depeche_create_post = function(req, res) {
    
    var depeche = new Depeche({
        title: req.body.title,
        content: req.body.content,
        tag: req.body.tag
    })

    depeche.save(function(err) {
        if (err) { return console.log(err) }
        res.redirect(depeche.url)
    })
};

// GET depeche detail.
exports.depeche_detail = function(req, res) {
    console.log('depeche details')
    Depeche.findById(req.params.id)
        .populate('comments')
        .exec((err, depeche) => {
            if (err) { return console.log(err) };
            console.log('Comments',depeche.comments)
            res.render('depeche/depeche_detail', {depeche: depeche})
        });
};

exports.tag_get = function(req, res) {
    Tag.find({}, (err, tags) => {
        console.log(tags)
        if (err) { return console.log(err) }
        res.send(tags);
    })
}