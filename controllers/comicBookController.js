const ComicBook = require('../models/comicBook');

// create a new comic book
exports.createComicBook = async (req, res) => {
    try {
        const comicBook = new ComicBook(req.body); // create a new instance of ComicBook with request body
        const savedComic = await comicBook.save(); // save the comic book to the database
        res.status(201).json(savedComic); // respond with the created comic book
    } catch (error) {
        // handle validation errors and respond with a 400 status
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'server error while creating comic book' }); // handle other server errors
    }
};

// update an existing comic book
exports.updateComicBook = async (req, res) => {
    try {
        const { id } = req.params; // get the ID from the request parameters
        const trimmedId = id.trim(); // trim any whitespace or newline characters

        const updatedComic = await ComicBook.findByIdAndUpdate(trimmedId, req.body, { new: true }); // update comic book
        if (!updatedComic) {
            return res.status(404).json({ message: 'comic book not found' }); // handle not found case
        }
        res.status(200).json(updatedComic); // respond with the updated comic book
    } catch (error) {
        // handle validation errors and respond with a 400 status
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'server error while updating comic book' }); // handle other server errors
    }
};

// delete a comic book
exports.deleteComicBook = async (req, res) => {
    try {
        const { id } = req.params; // get the ID from the request parameters
        const trimmedId = id.trim(); // trim any whitespace or newline characters

        const deletedComic = await ComicBook.findByIdAndDelete(trimmedId); // delete the comic book
        if (!deletedComic) {
            return res.status(404).json({ message: 'comic book not found' }); // handle not found case
        }
        res.status(200).json({ message: 'comic book deleted successfully' }); // respond with success message
    } catch (error) {
        res.status(500).json({ message: 'server error while deleting comic book' }); // handle server errors
    }
};

// Fetch comic books with pagination, filtering, and sorting
exports.getComics = async (req, res) => {
    try {
        const { page = 1, limit = 10, authorName, yearOfPublication, price, condition } = req.query; // Extract query params

        const query = {}; // Initialize the query object
        if (authorName) {
            query.authorName = { $regex: new RegExp(authorName.trim(), 'i') }; // Case-insensitive matching
        }
        if (yearOfPublication) {
            query.yearOfPublication = parseInt(yearOfPublication); // Ensure the year is an integer
        }
        if (price) {
            query.price = { $lte: parseFloat(price) }; // Ensure price is a float and filter by price
        }
        if (condition && ['new', 'used'].includes(condition.trim())) { // Check for valid condition values
            query.condition = condition.trim(); // Use the exact value
        }

        console.log('Query:', query); // Log the query for debugging purposes

        const total = await ComicBook.countDocuments(query); // Get total number of matching documents
        const totalPages = Math.ceil(total / limit); // Calculate total pages for pagination
        const comics = await ComicBook.find(query) // Find comics based on the query
            .limit(parseInt(limit)) // Limit the results to the specified number
            .skip((page - 1) * limit) // Skip to the correct page
            .sort({ bookName: 1 }); // Sort alphabetically by book name

        res.json({
            comics,
            totalPages,
            currentPage: Number(page), // Respond with the current page
        });
    } catch (error) {
        console.error("Server error:", error); // Log the error for debugging
        res.status(500).json({ message: 'Server error while fetching comics' }); // Handle server errors
    }
};

// get comic book details
exports.getComicBookDetails = async (req, res) => {
    try {
        const { id } = req.params; // get the ID from the request parameters
        const trimmedId = id.trim(); // trim any whitespace or newline characters

        const comicBook = await ComicBook.findById(trimmedId); // find the comic book by ID
        if (!comicBook) {
            return res.status(404).json({ message: 'comic book not found' }); // handle not found case
        }
        res.status(200).json(comicBook); // respond with the comic book details
    } catch (error) {
        res.status(500).json({ message: 'server error while fetching comic book details' }); // handle server errors
    }
};

// bulk create comic books
exports.bulkCreateComicBooks = async (req, res) => {
    try {
        const comics = req.body; // expecting an array of comic book objects
        const savedComics = await ComicBook.insertMany(comics); // insert multiple comic books into the database
        res.status(201).json(savedComics); // respond with the saved comics
    } catch (error) {
        // handle validation errors and respond with a 400 status
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'server error while bulk creating comic books' }); // handle other server errors
    }
};
