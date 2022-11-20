const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/user");
const { createErrorHandler } = require("./helper/apiHelper");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.get("/", (res, req) => {
  res.send("Database of contact");
});

app.use("/api/contacts", contactsRouter);
app.use("/user", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(createErrorHandler);

module.exports = app;
