import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import multer from "multer";
import sharp from "sharp";
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image please upload only images"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadProductImages = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "images", maxCount: 6 },
]);

const resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.files.photo || !req.files.images) return next();

  req.body.photof = `pro-main-${Date.now()}.jpeg`;
  await sharp(req.files.photo[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`frontend/public/uploads/img/${req.body.photof}`);
  let imagesf = [];
  req.files.images.map((file, i) => {
    const filename = `imgs_${Date.now()}-${i + 1}.jpeg`;

    sharp(file.buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`frontend/public/uploads/imgs/${filename}`);
    imagesf.push(filename);
  });
  req.body.imagesf = imagesf;
  next();
});

router.post("/productImages", uploadProductImages, resizeImage, (req, res) => {
  console.log(req.body.photof);
  res.status(200).json({
    uploadedImages: req.body.imagesf,
    photoUploaded: req.body.photof,
  });
});
export default router;
