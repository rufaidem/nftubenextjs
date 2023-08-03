// pages/api/updateProfile.js

import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // Make sure to create the "uploads" folder in the root directory

export const config = {
  api: {
    bodyParser: false, // Disable the default bodyParser
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    upload.single("avatar")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: "Multer error: " + err.message });
      } else if (err) {
        return res.status(500).json({ error: "File upload error: " + err.message });
      }

      const { profileId, name, bio } = req.body;
      const avatar = req.file ? req.file.path : undefined;

      await connectDB();

      try {
        const updatedUser = await Users.findOneAndUpdate(
          { profileId: profileId },
          { name, bio, avatar }
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
