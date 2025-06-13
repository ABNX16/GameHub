const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
   userEmail: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
   street: { type: String, required: true },
  landmark: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  purchaseDate: { type: String, required: true },
  upiId: { type: String, required: true },
  productImage: { type: String, required: true },
});


module.exports = mongoose.model('Seller', sellerSchema);
