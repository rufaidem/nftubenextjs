// pages/api/updateAvatar.js

import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./public/uploads", // Destination folder for storing the uploaded avatar images
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit the file size to 5MB (adjust as needed)
  },
}).single("avatar");

export const config = {
  api: {
    bodyParser: false, // Disable the default bodyParser
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A multer error occurred during file upload
        return res.status(500).json({ error: "Multer error: " + err.message });
      } else if (err) {
        // Other error occurred during file upload
        return res.status(500).json({ error: "File upload error: " + err.message });
      }

      const { profileId, name, bio } = req.body;
      const avatarPath = req.file ? req.file.path : undefined;

      await connectDB();

      try {
        const updatedUser = await Users.findOneAndUpdate(
          { profileId: profileId },
          { name, bio, avatar: avatarPath }
        );

        if (updatedUser) {
          res.status(200).json({ name: updatedUser.name, bio: updatedUser.bio });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        res.status(400).json({ error });
        console.error(error);
      }
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
