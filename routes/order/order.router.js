const router = require('express').Router();
const orderController = require('../../controllers/order/order.controller');
router.post('/create-new-order' , orderController.createNewOrder)
router.get('/get-order-by-email/:email' , orderController.getOrdersByEmailId)
router.get('/all' , orderController.getAllOrders)

module.exports = router;