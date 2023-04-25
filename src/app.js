const express = require('express');
const mongoose = require('mongoose');
require("../src/db/connect")
const User = require("../src/routers/users")
const app = express();
const port = process.env.PORT || 3000 ; //giving a port number to host on.

app.use(express.json());

app.get('/users', async (req, res) => {
  
  try{
    const { locations } = req.query;
    const { verified }  = req.query

  if (!locations) {
    return res.status(400).send('Please provide at least one location.');
  }

   const users = await User.find({ location :  { $in: locations.split(',') }, verified: true})
   console.log(users)
  res.send(users);
  }
   catch(error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
    }
  
});

app.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).send('Please provide a search query.');
  }

  const users = await User.find({ $or: [{ name: new RegExp(q, 'i') }, { location: new RegExp(q, 'i') }] });

  res.send(users);
});


app.post("/users", async (req,res) => {
  try{
    const users = new User(req.body)
    await users.save()
    res.status(200).json(users)
  }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
});


app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});

  
  