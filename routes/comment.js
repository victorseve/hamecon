var express = require('express');
var router = express.Router();

var comment_controller = require('../controller/comment');

/// COMMENT ROUTES ///

// POST comment create.
router.post('/comment_article_post', comment_controller.comment_article_post);
router.post('/comment_depeche_post', comment_controller.comment_depeche_post);

module.exports = router;

