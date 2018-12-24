var request = require('request');
var cheerio = require('cheerio');
var Article = require('../models/article');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var User = require('../models/user');

exports.article_list = function(req, res) {

    console.log('article list')
    var perPage = 10;
    var page = req.params.page || 1     
    Article.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .populate('comments')
        .sort({'createdAt': -1})
        .exec((err, articles) => {
        if (err) { return console.log(err) };
        Article.count().exec((err, count) => {
            if (err) { return console.log(err) }
            res.render('article/article_list', { 
                article_list: articles, 
                current:page, pages: Math.ceil(count / perPage)
            });   
        })
    })
};

// GET article create.
exports.article_create_get = function(req, res) {
    console.log('rendering article form')
    res.render('article/article_form', {errors: []});
};

// POST article create.
exports.article_create_post = [

    // Validate fields.
    body('site_name', 'Site name must not be empty.').isLength({ min: 1 }).trim(),
    body('article_url', 'Article url must not be empty.').isLength({ min: 1 }).trim(),
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
    body('description', 'Description must not be empty').isLength({ min: 1 }).trim(),
    body('image', 'Image must not be empty').isLength({ min: 1 }).trim(),
    body('published_time', 'Published time must not be empty').isLength({ min: 1 }).trim(),
    body('content', 'Content must not be empty').isLength({ min: 1 }).trim(),

    //sanitizeBody('*').trim().escape(),
    
    (req, res) => {
        var article = new Article({
            site_name: req.body.site_name,
            article_url: req.body.article_url,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            published_time: req.body.published_time,
            content: req.body.content
        })

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('article/article_form', {errors: errors});
        }

        article.save(function(err) {
            if (err) { return console.log(err) }
            return res.redirect(article.url)
        })
}];

// GET article detail.
exports.article_detail = function(req, res) {
    Article.findById(req.params.id)
    .populate('comments').exec((err, article) => {
        if (err) { return console.log(err) };
        res.render('article/article_detail', {article: article})
    });
};

// GET article detail.
exports.article_meta_post = function(req, res) {
    console.log('Requested url', req.body.url)
    request(req.body.url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const meta = getMetadata(body);
            res.send(JSON.stringify(meta));
        } else {
            console.log('Error', error)
        }
     })
};

function getMetadata(content) {
    const $ = cheerio.load(content)
    if ($('meta') === null) {
        return {'site_name': undefined, 'type': undefined, 'article_url': undefined, 'title': undefined, 'description': undefined, 'image': undefined, 'published_time': undefined}
    }
    const site_name = $('meta[property="og:site_name"]').attr('content');
    const type = $('meta[property="og:type"]').attr('content');
    const article_url = $('meta[property="og:article_url"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content');
    const image = $('meta[property="og:image"]').attr('content');
    const section = $('meta[property="article:section"]').attr('content');
    const published_time = $('meta[property="article:published_time"]').attr('content');
    console.log('getMetaData', {'site_name': site_name, 'type': type, 'article_url': article_url, 'title': title, 'description': description, 'image': image, 'section': section, 'published_time': published_time})
    return {'site_name': site_name, 'type': type, 'article_url': article_url, 'title': title, 'description': description, 'image': image, 'section': section, 'published_time': published_time}
};