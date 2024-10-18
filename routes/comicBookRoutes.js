const express = require('express');
const {
    createComicBook,
    updateComicBook,
    deleteComicBook,
    getComics,
    getComicBookDetails,
    bulkCreateComicBooks
} = require('../controllers/comicBookController'); // correctly importing functions

const router = express.Router(); // create a new router instance

// create a new comic book
router.post('/comics', createComicBook); // endpoint to create a comic book

// update an existing comic book
router.put('/comics/:id', updateComicBook); // endpoint to update a comic book by ID

// delete a comic book
router.delete('/comics/:id', deleteComicBook); // endpoint to delete a comic book by ID

// fetch all comics with pagination, filtering, and sorting
router.get('/comics', getComics); // endpoint to get a list of comic books with options

// get details of a specific comic book
router.get('/comics/:id', getComicBookDetails); // endpoint to get details of a comic book by ID

// bulk create comic books
router.post('/comics/bulk', bulkCreateComicBooks); // endpoint to create multiple comic books

module.exports = router; // export the router
