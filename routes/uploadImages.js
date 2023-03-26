const path = require("path");
const express = require("express");
const multer = require("multer");
const { dirname } = require("path");
const router = express.Router();
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const fs = require("fs");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

function uploadFile(file) {
  file.forEach((singleFile) => {
    const ext = String(singleFile.originalname).split(".")[1];
    const fileName = String(singleFile.originalname).split(".")[0];
    const fileStream = fs.createReadStream(singleFile.path);

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Body: fileStream,
      Key: `${fileName}.${ext}`,
    };

    return s3.upload(uploadParams).promise();
  });
}

// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: storage });

router.post("/uploadImages", upload.array("image", 9999), async (req, res) => {
  const file = req.files;

  const result = await uploadFile(file);

  res.send(result);
  var folder = "./uploads/";
  fs.readdir(folder, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlinkSync(folder + file);
    }
  });
});

module.exports = router;
