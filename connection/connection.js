const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectMongo };
