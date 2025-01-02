const Order = require("../../models/order/order.model");

const createNewOrder = async (req, res) => {
    try {
        console.log('Received data in backend:', req.body);
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        return res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order", error);
        return res.status(500).json({ message: error.message })
    }
}

const getOrdersByEmailId = async (req, res) => {
    try {
        const email = req.params.email;
        const orders = await Order.find({ email: email }).sort({ createdAt: -1 });
        if (!orders) {
            return res.status(404).json({ message: "No orders found for this email" })
        }
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({ message: "Failed to fetch order" })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        if (!orders) {
            return res.status(404).json({ message: "No orders found" })
        }
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({ message: "Failed to fetch order" })
    }
}

module.exports = { createNewOrder, getOrdersByEmailId, getAllOrders }; 