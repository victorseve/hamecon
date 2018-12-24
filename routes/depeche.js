var express = require('express');
var router = express.Router();

var depeche_controller = require('../controller/depeche');

/// ARTICLE ROUTES ///


// GET home page
router.get('/', depeche_controller.depeche_list)
router.get('/pages/:page', depeche_controller.depeche_list)

// GET depeche create.
router.get('/create', depeche_controller.depeche_create_get);
// POST depeche create.
router.post('/create', depeche_controller.depeche_create_post);

// GET depeche detail.
router.get('/:id', depeche_controller.depeche_detail);

module.exports = router;