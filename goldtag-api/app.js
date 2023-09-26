const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const contentRouter = require("./routes/content");
const authUser = require("./middleware/authentication");
swaggerJsdoc = require("swagger-jsdoc");
swaggerUi = require("swagger-ui-express");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const bodyParser = require("body-parser");

// routes
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Goldtag API",
      version: "0.1.0",
      description: "Goldtag API via Swagger",
      contact: {
        name: "Goldtag",
        url: "https://goldtag.org",
        email: "info@goldtag.net",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs,{explorer:true}));
app.use(bodyParser.json());
app.use("/", authRouter);
app.use("/", contentRouter);
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
