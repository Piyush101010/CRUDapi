// require the express
const express = require('express');
const port = 8000;

//require mongoose 
const mongoose = require('mongoose');

//import the routes
const routes = require('./routes/dev');



//create express app
const app = express();

//middleware
app.use(express.json());

//conect with mongoDB
mongoose.connect('mongodb://127.0.0.1/devDB',{useNewUrlParser : true, useUnifiedTopology : true})
  .then(() => {
    console.log('MongoDB successfully connected');
  })
  .catch((err) => console.log(err));

//using the routes
app.use('/api/client',routes);



//listen to the app
app.listen(port, (err)=>{
    if(err){
        console.log(`Error running server ${err}`);
    }

    console.log(`Server is running on port : ${port}`)
});