const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  product: { type: Object, required: true, ref: 'Product' },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Cart2', CartSchema);
