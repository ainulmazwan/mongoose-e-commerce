const express = require("express");
const router = express.Router();

const multer = requrie("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const image_url = req.file.path;
    // send back the image url
    res.status(200).send({ image_url: image_url });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unable to uplaod image",
    });
  }
});

modules.exports = router;
