const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

// Add item
router.post('/add', async (req, res) => {
  try {
    const { userEmail, name, image, price, offer, offerPrice, category } = req.body;
    const existing = await Cart.findOne({ userEmail, name });
    if (existing) return res.status(400).json({ error: 'Item already in cart' });

    const cartItem = new Cart({ userEmail, name, image, price, offer, offerPrice, category });
    const savedItem = await cartItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Get user's cart
router.get('/:email', async (req, res) => {
  try {
    const items = await Cart.find({ userEmail: req.params.email });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
