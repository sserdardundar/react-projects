const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const authUser = require("./middleware/authentication");
const authRouter = require("./routes/auth");
const contentRouter = require("./routes/content");
const swaggerUi = require("swagger-ui-express");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerDocument = require("./swaggerDoc.json");
const swaggerJsdoc = require("swagger-jsdoc");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", authRouter);
app.use("/",authUser, contentRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
