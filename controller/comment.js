var Comment = require('../models/comment');
var Article = require('../models/article');
var Depeche = require('../models/depeche');

exports.comment_article_post = function(req, res) {
    var comment = new Comment({
        username: req.session.user.name,
        message: req.body.comment
    })

    Comment.create(comment, function (err, comment) {
        if (err) { return console.log(err) }

        Article.findOneAndUpdate({_id: req.body.doc_id}, {$push: { comments: comment }},
            function(err, article) {
                console.log(article);
                if (err) { return console.log(err) };
                return res.send(JSON.stringify(comment));
            }
        )
      });
};

exports.comment_depeche_post = function(req, res) {
    var comment = new Comment({
        username: req.session.user.name,
        message: req.body.comment
    })

    Comment.create(comment, function (err, comment) {
        if (err) { return console.log(err) }

        Depeche.findOneAndUpdate({_id: req.body.doc_id}, {$push: { comments: comment }},
            function(err, depeche) {
                if (err) { return console.log(err) };
                return res.send(JSON.stringify(comment));
            }
        )
      });
};