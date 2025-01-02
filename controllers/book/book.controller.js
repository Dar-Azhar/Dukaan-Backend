const Book = require('../../models/book/book.model');

const createNewBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
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
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
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
