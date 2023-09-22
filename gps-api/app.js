const express=require('express')
const app= express()
require('dotenv').config()
const cors = require('cors')

const connectDB=require('./db/connect')
const {updater}=require('./controllers/updater')
const authRouter=require('./routes/auth')
const cryptoRouter=require('./routes/crypto')
const userRouter = require('./routes/user')
const authUser= require('./middleware/authentication')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
    const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  // Use the cors middleware with the custom options
  app.use(cors(corsOptions));
// routes
app.use('/api/v1/',authRouter)
app.use('/api/v1/crypto',authUser,cryptoRouter)
app.use('/api/v1/user',authUser,userRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000; 
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    setInterval(async ()=>{
      await updater()
    },1800000000)
    
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );

  } catch (error) {
    console.log(error);
  }
};

start();