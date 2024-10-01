require('dotenv').config();
require('express-async-errors');
const express= require('express');
const app= express();

app.get('/hello',(req,res)=>{
  res.send('Hello');
  console.log('Server is printing');
});

app.listen(3000,console.log('Server is listening at port 3000'))
