
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  mobile_no: { type: String, required: true, unique: true }, // Unique index for mobile_no
  email: { type: String, required: true, unique: true }, // Email is not unique
  name: { type: String, required: true },
  password: { type: String, required: true },
  c_password: { type: String, required: true },
  role: { type: String, required: true, unique: true  },
});

const newUser = mongoose.model('Users', userSchema);

module.exports = newUser;


