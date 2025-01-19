const route = require("express").Router()
const bookController = require('../../controllers/book/book.controller')
const verifyAdminToken = require("../../middleware/verifyAdminToken")
const { upload } = require('../upload.router');


route.post('/create',verifyAdminToken, upload.single('coverImage'), bookController.createNewBook)
route.get('/all', bookController.getAllBooks)   
route.put('/update/:id',verifyAdminToken, upload.single('coverImage'),  bookController.updateBook)
route.get('/single/:id', bookController.getSingleBook)
route.delete('/delete/:id', verifyAdminToken,  bookController.deleteBook)

module.exports = route;