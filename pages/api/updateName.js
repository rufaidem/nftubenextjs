// pages/api/updateName.js

import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";

export default async (req, res) => {
  const { profileId, name } = req.body;

  await connectDB();

  try {
    const updatedUser = await Users.findOneAndUpdate(
      { profileId: profileId },
      { name: name }
    );

    if (updatedUser) {
      res.status(200).json({ name: updatedUser.name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error });
    console.error(error);
  }
};
