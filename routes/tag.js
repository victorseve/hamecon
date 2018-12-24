var express = require('express');
var router = express.Router();

var tag_controller = require('../controller/tag');

/// TAG ROUTES ///

// GET tag create.
router.get('/create', tag_controller.tag_create_get);
// POST tag create.
router.post('/create', tag_controller.tag_create_post);
// GET tag detail.
router.get('/:id', tag_controller.tag_detail);
// GET tag delete.
router.post('/:id/delete', tag_controller.tag_delete_post);
// GET tag update.
router.get('/:id/update', tag_controller.tag_create_get);
// POST tag update.
router.post('/:id/update', tag_controller.tag_update_post);
// GET tag home page.
router.get('/', tag_controller.tag_list);


module.exports = router;

