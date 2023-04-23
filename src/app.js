const express = require('express');
require("../src/db/connect")
const User = require("../src/routers/users")
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; //giving a port number to host on.

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`connected ${port}`)
})

//handle get request
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
  
  