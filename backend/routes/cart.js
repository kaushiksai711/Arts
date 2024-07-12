const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Cart2 = require('../models/Cart1');
const Product = require('../models/Product');

router.post('/add', authenticate, async (req, res) => {
  const { product, quantity } = req.body;
  console.log(req.body)
  try {
    const cartItem = new Cart2({ userId: req.userId, product, quantity });
    console.log(cartItem,'cartitem')
    await cartItem.save();
    res.send({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).send({ message: 'Error adding to cart', error });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const cartItems = await Cart2.find({ userId: req.userId }); 
    res.send(cartItems);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching cart', error });
  }
});

router.delete('/remove/:id', authenticate, async (req, res) => {
  try {
    console.log('backitcame')
    const { id } = req.params;
    console.log(id)
    await Cart2.findOneAndDelete({ userId: req.userId, _id:id });
    res.send({ message: 'Item removed from cartbackend' });
  } catch (error) {
    res.status(500).send({ message: 'Error removing item from cart', error });
  }
});

module.exports = router;
