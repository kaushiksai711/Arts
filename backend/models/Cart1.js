const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  productId: String,
  quantity: Number,
});

module.exports = mongoose.model('Cart2', CartSchema);
