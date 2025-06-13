const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  offer: { type: Number },
  offerPrice: { type: Number },
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
