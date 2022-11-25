const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./tmp"));
  },
  filename: (req, file, cb) => {
    // eslint-disable-next-line no-unused-vars
    const [filename, extension] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const uploadAvatartMiddleware = multer({ storage });

module.exports = {
  uploadAvatartMiddleware,
};
