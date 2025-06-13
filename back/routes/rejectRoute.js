const express = require('express');
const router = express.Router();
const Reject = require('../models/reject');

// Add a rejected entry
router.post('/add', async (req, res) => {
  try {
    const newReject = new Reject(req.body);
    const savedReject = await newReject.save();
    res.status(201).json(savedReject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add rejected entry' });
  }
});

// Get all rejected entries
router.get('/', async (req, res) => {
  try {
    const allRejects = await Reject.find();
    res.status(200).json(allRejects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch rejected entries' });
  }
});
// Get by email
router.get('/:email', async (req, res) => {
  try {
    const allRejects = await Reject.find( {userEmail: req.params.email});
    res.status(200).json(allRejects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch rejected entries' });
  }
});


module.exports = router;
