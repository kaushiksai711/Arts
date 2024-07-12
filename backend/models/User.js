const mongoose = require('mongoose');
const CartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
  });
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [CartItemSchema],
});

module.exports = mongoose.model('User', UserSchema);
