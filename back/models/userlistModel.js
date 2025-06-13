const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String,required: true, unique: true},
  name: String,
  phone: String,
  password: { type: String,required: true}
});



module.exports = mongoose.model('Userlist', userSchema);

