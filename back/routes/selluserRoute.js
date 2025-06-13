const express = require('express');
const router = express.Router();
const multer = require('multer');
const Selluser = require('../models/selleruser');

const path = require('path');

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Add Seller for admin
router.post('/userview', upload.single('productImage'), async (req, res) => {
  try {
    const newSelluser = new Selluser({
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

    const savedSelluser = await newSelluser.save();
    res.status(201).json({
      success: true,
      seller: savedSelluser,
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to add seller.' });
  }
});
//get 
router.get('/', async (req, res) => {
  try {
    const selluser = await Selluser.find();
    res.status(200).json(selluser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch sellers" });
  }
});
// Delete order by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    await Selluser.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting order' });
  }
});



module.exports = router;
