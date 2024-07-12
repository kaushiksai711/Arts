const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Cart2 = require('../models/Cart1');  // Correct import

router.post('/add', authenticate, async (req, res) => {
  const { productId, quantity } = req.body;
  const cartItem = new Cart2({ userId: req.userId, productId, quantity });
  await cartItem.save();
  res.send({ message: 'Item added to cart' });
});

router.get('/', authenticate, async (req, res) => {
  const cartItems = await Cart2.find({ userId: req.userId });
  res.send(cartItems);
});

module.exports = router;
