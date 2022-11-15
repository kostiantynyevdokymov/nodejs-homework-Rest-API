require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

const { connectMongo } = require("./db/connection");

const startConnect = async () => {
  try {
    await connectMongo();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startConnect();
