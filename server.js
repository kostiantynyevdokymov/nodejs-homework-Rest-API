require("dotenv").config();

const app = require("./app");

const port = process.env.PORT || 3000;

const { connectMongo } = require("./db/connection");

const start = async () => {
  try {
    await connectMongo();
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
