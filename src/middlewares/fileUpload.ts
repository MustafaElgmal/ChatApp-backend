import AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({
  region: "eu-west-3",
  credentials: {
    secretAccessKey: 'j5hb6UqBREQVGgqVOCiTgxzHDOJVAdNQ8hDQj8gQ',
    accessKeyId: 'AKIASCYRJIYJCXX26Y7K',
  },
});

export const upload = multer({
  fileFilter: function (req, file, cb) {
    let fileExtension = file.originalname
      .split(".")
      [file.originalname.split(".").length - 1].toLowerCase();
    if (["png", "jpg", "jpeg", "webp"].indexOf(fileExtension) === -1) {
      return cb(null, false);
    }
    cb(null, true);
  },
  limits: {
    files: 1,
  },
  storage: multerS3({
    s3,
    bucket: "reviews2024",
    acl: "aws-exec-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: " TESTING_META_DATA!" });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}${file.originalname}`);
    },
  }),
});
