const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const authenticate = require('../middleware/authenticate');
router.post('/', async (req, res) => {
    const { userId, products, totalAmount, address } = req.body;

    if (!userId || !products || !totalAmount || !address) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const newOrder = new Order({
            userId,
            products,
            totalAmount,
            address,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.put('/:orderId', async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { Paid: 'Yes' }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order has been successfully paid and updated' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/', authenticate, async (req, res) => {
    const userId = req.userId; // Extract user ID from authenticated request
  
    try {
      const orders = await Order.find({ userId: userId, paid: 'Yes' });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });
module.exports = router;
