const mongoose = required("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
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

//we are creating a new collection
const User = mongoose.model('User', userSchema);

module.exports = User;