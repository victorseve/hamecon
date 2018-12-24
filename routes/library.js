var express = require('express');
var router = express.Router();

var library_controller = require('../controller/library');
var book_controller = require('../controller/book');
var author_controller = require('../controller/author');
var tag_controller = require('../controller/tag');
var note_controller = require('../controller/notes');

/// LIBRARY ROUTES ///

// GET index
router.get('/', (req, res) => {res.send('Welcome to the library')})
// GET tags.
router.get('/get-tags', library_controller.tag_get);
// GET authors.
router.get('/get-authors', library_controller.author_get);


/// BOOK ROUTES ///

// GET book home page.
router.get('/books', book_controller.book_list);
router.get('/books/pages/:page', book_controller.book_list);

// GET book create.
router.get('/book/create', book_controller.book_create_get);
// POST book create.
router.post('/book/create', book_controller.book_create_post);

// GET book update.
router.get('/book/:id/update', book_controller.book_update_get);
// POST book update.
router.post('/book/:id/update', book_controller.book_update_post);

// GET book detail.
router.get('/book/:id', book_controller.book_detail);



/// NOTE ROUTES ///

// GET book create.
router.get('/note/create', note_controller.note_create_get);
// POST note create.
router.post('/note/create', note_controller.note_create_post);

// GET note update.
router.get('/note/:id/update', note_controller.note_update_get);
// POST note update.
router.post('/note/:id/update', note_controller.note_update_post);

// GET note detail.
router.get('/note/:id', note_controller.note_detail);
// GET note home page.
router.get('/notes', note_controller.note_list);



/// AUTHOR ROUTES ///

// GET author create.
router.get('/author/create', author_controller.author_create_get);
// POST author create.
router.post('/author/create', author_controller.author_create_post);
// GET author POP create.
router.get('/author/pop_create', author_controller.author_create_pop_get);
// POST author POP create.
router.post('/author/pop_create', author_controller.author_create_pop_post);
// GET author detail.
router.get('/author/:id', author_controller.author_detail);
// GET author update.
router.get('/author/:id/update', author_controller.author_create_pop_get);
// POST author update.
router.post('/author/:id/update', author_controller.author_update_post);
// GET author home page.
router.get('/authors', author_controller.author_list);


/// TAG ROUTES ///

// GET tag create.
router.get('/tag/create', tag_controller.tag_create_get);
// POST tag create.
router.post('/tag/create', tag_controller.tag_create_post);
// GET tag detail.
router.get('/tag/:id', tag_controller.tag_detail);
// GET tag delete.
router.post('/tag/:id/delete', tag_controller.tag_delete_post);
// GET tag update.
router.get('/tag/:id/update', tag_controller.tag_create_get);
// POST tag update.
router.post('/tag/:id/update', tag_controller.tag_update_post);
// GET tag home page.
router.get('/tags', tag_controller.tag_list);


module.exports = router;

