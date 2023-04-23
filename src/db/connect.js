const mongoose =  require("mongoose");

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true }).then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.log("Connection failed", error);
})