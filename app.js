require('dotenv').config();
require('express-async-errors');
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const express= require('express');
const app= express();
const connectDB = require('./db/connect')
const authRouter = require('./routers/auth_routes')


const {PORT,MONGO_URI} = process.env
const authenticateUser = require('./middleware/authentication')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use(express.json())
app.use('/api/v1/auth',authRouter)
app.get('/hello',(req,res)=>{
  res.send('Hello');
  console.log('Server is printing');
});
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware)


const start = async () => {
  try{
    await connectDB(MONGO_URI)
    app.listen(PORT || 3000,()=>{
      console.log(`Server is running on port: ${PORT}`)
    })
  }
  catch(error){
    console.log(error);
  }
}

start()