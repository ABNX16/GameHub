const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');


// GET
router.get('/products', async (req, res) => {
    try {
      const products = await ProductModel.find();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;