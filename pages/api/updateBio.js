import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";

export default async (req, res) => {
  const { profileId, name, bio } = req.body;

  await connectDB();

  try {
    await Users.findOneAndUpdate(
      { profileId: profileId },
      { name: name, bio: bio } // Updating both name and bio fields
    );
    res.status(200).json({ name, bio });
  } catch (error) {
    res.status(400).json({ error });
    console.error(error);
  }
};
