const express = require('express');
const router = express.Router();
const Visited = require('../models/visitedModel');

// Add visited seller
router.post('/add', async (req, res) => {
  try {
    const visitedSeller = new Visited({
     userEmail: req.body.userEmail,
      name: req.body.name,
      number: req.body.number,
      email: req.body.email,
      address: req.body.address,
      productName: req.body.productName,
      category: req.body.category,
      purchaseDate: req.body.purchaseDate,
      upiId: req.body.upiId,
      productImage: req.body.productImage,
    });

    const savedVisited = await visitedSeller.save();
    res.status(201).json(savedVisited);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add visited seller' });
  }
});

// Get all visited sellers
router.get('/', async (req, res) => {
  try {
    const visitedSellers = await Visited.find();
    res.status(200).json(visitedSellers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visited sellers' });
  }
});
// Get visited by email
router.get('/:email', async (req, res) => {
  try {
    const visitedSellers = await Visited.find({ userEmail: req.params.email });
    res.status(200).json(visitedSellers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visited sellers' });
  }
});
// delete
router.delete('/delete/:id', async (req, res) => {
  try {
    await Visited.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

module.exports = router;
