const express=require('express')
const app= express()
require('dotenv').config()

const connectDB=require('./db/connect')
const authRouter=require('./routes/auth')
const contentRouter=require('./routes/content')
const authUser= require('./middleware/authentication')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const bodyParser = require('body-parser')

// routes
app.use(bodyParser.json())
app.use('/api/v1/',authRouter)
app.use('/api/v1/',authUser,contentRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000; 
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();