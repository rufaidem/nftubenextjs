// lib/userSchema.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
    },
    name: {
      type: String,
    },
    bio: {
      type: String,
      default: "This is my Bio",
    },
    avatar: {
      type: String, // Store the path to the uploaded avatar image
    },
  },
  { timestamps: true }
);

// ... rest of the code


let Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;
