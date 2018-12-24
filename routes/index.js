var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('users/login');
  } else {
    return res.render('index', { title: 'Hamecon', user: req.session.user});
  }
});

module.exports = router;
