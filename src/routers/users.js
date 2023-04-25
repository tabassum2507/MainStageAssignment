const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      minlengt: 3
    },
    location: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      required: true
    }  
  });
  
  const User = mongoose.model('User', userSchema);

module.exports = User;