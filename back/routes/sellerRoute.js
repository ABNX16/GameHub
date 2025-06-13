const express = require('express');
const router = express.Router();
const multer = require('multer');
const Seller = require('../models/sellerModel');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Add Seller
router.post('/addsell', upload.single('productImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Product image is required.' });
    }

    const newSeller = new Seller({
      userEmail: req.body.userEmail,
      name: req.body.name,
      number: req.body.number,
      email: req.body.email,
      address: req.body.address,
      street: req.body.street,
      landmark: req.body.landmark,
      city: req.body.city,
      district: req.body.district,
      state: req.body.state,
      productName: req.body.productName,
      category: req.body.category,
      purchaseDate: req.body.purchaseDate,
      upiId: req.body.upiId,
      productImage: req.file.filename,
    });

    const savedSeller = await newSeller.save();
    res.status(201).json({
      success: true,
      seller: savedSeller,
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to add seller.' });
  }
});

// Get all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch sellers" });
  }
});

// Get seller by user email
router.get('/:email', async (req, res) => {
  try {
    const sellers = await Seller.find({ userEmail: req.params.email });
    res.status(200).json(sellers);
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch sellers" });
  }
});

// Delete by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    await Seller.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting order' });
  }
});

module.exports = router;
