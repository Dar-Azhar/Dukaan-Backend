const Book = require('../../models/book/book.model');

const createNewBook = async (req, res) => {
    try {
        const { title, description, category, trending, oldPrice, newPrice } = req.body;

        // Check if the file exists and build the coverImage URL
        if (!req.file) {
            return res.status(400).json({ status: 'error', message: 'Cover image is required' });
        }
        // const coverImageUrl = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;
        // Use the secure URL from Cloudinary
        const coverImageUrl = req.file.path || req.file.secure_url;
        // Create the new book object
        const newBook = new Book({
            title,
            description,
            category,
            trending,
            coverImage: coverImageUrl,
            oldPrice,
            newPrice,
        });

        // Save the book to the database
        await newBook.save();
        return res.status(201).json({ status: 'success', message: 'Book created', data: newBook });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
};


const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();
        if (!allBooks.length) {
            return res.status(404).json({ status: 'error', message: 'No books found' });
        }
        return res.status(200).json({ status: 'success', message: 'All books', data: allBooks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
};

const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const singleBook = await Book.findById(id);
        if (!singleBook) {
            return res.status(404).json({ status: 'error', message: 'No book found' });
        }
        return res.status(200).json({ status: 'success', message: 'Single book', data: singleBook });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // Check if a new file is uploaded
        // Handle file upload if provided
        if (req.file) {
            // Ensure `coverImage` is a string (e.g., file path or secure URL)
            updates.coverImage = req.file.path || req.file.secure_url;
        } else {
            // Remove `coverImage` from updates if no file is provided
            delete updates.coverImage;
        }
        const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ status: 'error', message: 'No book found' });
        }
        return res.status(200).json({ status: 'success', message: 'Book updated', data: updatedBook });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ status: 'error', message: 'No book found' });
        }
        return res.status(200).json({ status: 'success', message: 'Book deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
};

module.exports = { createNewBook, getAllBooks, getSingleBook, updateBook, deleteBook };
