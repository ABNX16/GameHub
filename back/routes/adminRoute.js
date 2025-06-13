const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/ProductModel');
const path = require('path');




// Setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Add product
router.post('/addpro', upload.single('image'), async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      offer: req.body.offer,
      offerPrice: req.body.offerPrice,
      category: req.body.category,
      image: req.file ? '/uploads/' + req.file.filename : '',
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE product
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Get one product
router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put('/product/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      offer: req.body.offer,
      offerPrice: req.body.offerPrice,
      category: req.body.category,
    };
    if (req.file) {
      updatedData.image = '/uploads/' + req.file.filename; // prepend the folder
    }
    

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;