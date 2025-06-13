const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();
require('dotenv').config();

const Order = require('../models/orderModel');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Razorpay payment order creation
router.post('/razorpay', async (req, res) => {
  const { amount } = req.body;

  try {
    const payment_order = await razorpay.orders.create({
      amount: amount, // in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    });

    res.json({
      success: true,
      order: payment_order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Razorpay order creation failed." });
  }
});


// Create a new order in your database
router.post('/create', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to create order." });
  }
});

// Get all orders from your database
router.get('/list', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});
//get user order

router.get('/:email',async(req, res)=>{
  try{
    const order = await Order.find({userEmail: req.params.email});
    res.status(200).json(order);
  }catch(err){
    res.status(500).json({error: "failed"});
  }
});

// Delete order by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

module.exports = router;
