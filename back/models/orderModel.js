const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  image: { type: String },
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
  pincode: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  landmark: { type: String },
  price: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['COD', 'ONLINE'], required: true },
 razorpayPaymentId: { type: String, default: null },
  razorpayOrderId: { type: String, default: null },
  razorpaySignature: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
