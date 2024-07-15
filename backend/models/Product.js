const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  dimensions: { type: String, required: true },
  materials: { type: String, required: true },
  count: { type: Number, required: true }
});

module.exports = mongoose.model('Product4', productSchema);
