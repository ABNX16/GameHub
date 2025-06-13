const express = require('express');
const router = express.Router();
const Accept = require('../models/accept');

// Add accpet
router.post('/add', async (req, res) => {
  try {
    const acceptvisited = new Accept(req.body); 
    const savedAccept = await acceptvisited.save(); 
    res.status(201).json(savedAccept);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add' });
  }
});

// Get all accpet
router.get('/', async (req, res) => {
  try {
    const acceptvisited = await Accept.find(); 
    res.status(200).json(acceptvisited);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch' });
  }
});
// Get by email
router.get('/:email', async (req, res) => {
  try {
    const acceptvisited = await Accept.find({ userEmail: req.params.email}); 
    res.status(200).json(acceptvisited);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch' });
  }
});
// delete
router.delete('/delete/:id', async (req, res) => {
  try {
    await Accept.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

module.exports = router;
