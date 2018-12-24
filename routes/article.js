var express = require('express');
var router = express.Router();

var article_controller = require('../controller/article');

/// ARTICLE ROUTES ///


// GET home page
router.get('/', article_controller.article_list);
router.get('pages/:page', article_controller.article_list);

// GET article create.
router.get('/create', article_controller.article_create_get);
// POST article create.
router.post('/create', article_controller.article_create_post);

// POST article metadata.
router.post('/meta', article_controller.article_meta_post);

// GET article detail.
router.get('/:id', article_controller.article_detail);


module.exports = router;