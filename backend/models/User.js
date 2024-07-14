const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type:String,required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{ 
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }, 
    quantity: { type: Number, required: true } 
  }]
});

module.exports = mongoose.model('User', UserSchema);
