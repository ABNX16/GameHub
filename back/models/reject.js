const mongoose = require('mongoose');

const rejectSchema = new mongoose.Schema({
 userEmail: String,
  name: String,
  number: String,
  email: String,
  address: String,
  productName: String,
  category: String,
  purchaseDate: String,
  upiId: String,
  productImage: String,
});

module.exports = mongoose.model('Reject', rejectSchema);
