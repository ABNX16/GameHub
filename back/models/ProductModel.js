const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    offer: { type: String, required: true },
    offerPrice: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true } // Store image filename or URL
});

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;
