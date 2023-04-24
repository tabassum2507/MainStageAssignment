// const express = require('express');
// require("../src/db/connect")
// const User = require("../src/routers/users")
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 3000; //giving a port number to host on.

// app.use(bodyParser.json());

// app.listen(port, () => {
//     console.log(`connected ${port}`)
// })

// //handle get request
// app.get('/users', async (req, res) => {
//     const { searchString, location, verified } = req.query;
  
//     let query = {};
  
//     if (searchString) {
//       query.name = { $regex: searchString, $options: 'i' };
//     }
  
//     if (location && location.length > 0) {
//       query.location = { $in: location };
//     }
  
//     if (verified === 'true') {
//       query.verified = true;
//     }
  
//     const users = await User.find(query).sort({ name: 1 }).exec();
  
//     res.json(users);
// });


const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000 ; //giving a port number to host on.

app.use(express.json());

mongoose.connect( "mongodb://127.0.0.1:27017/users" , { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Connection failed', error);
  });

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

app.get('/users', async (req, res) => {
  const { searchString, location, verified } = req.query;

  let query = {};

  if (searchString) {
    query.name = { $regex: searchString, $options: 'i' };
  }

  if (location && location.length > 0) {
    query.location = { $in: location };
  }

  if (verified === 'true') {
    query.verified = true;
  }

  const users = await User.find(query).sort({ name: 1 }).exec();

  res.json(users);
});

// app.post("/users", async (req,res) => {
//   try{
//     const users = new User(req.body)
//     await users.save()
//     res.status(200).json(users)
//   }catch(error){
//     console.log(error.message);
//     res.status(500).json({message: error.message})
//   }
// });


app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});

  
  