import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype.startsWith("video")) {
      return {
        folder: "lectures",
        resource_type: "video",
        allowed_formats: ["mp4", "mov", "avi"],
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      };
    } else if (file.mimetype.startsWith("image")) {
      return {
        folder: "images",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "webp", "png"],
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      };
    } else {
      throw new Error("Invalid file type");
    }
  }

});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video"))
      cb(null, true);
    else
      cb(new Error("Only images and videos are allowed!"), false);
  }
});

export default upload;