import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },

  username: {
    type: String,
    required: false,
    unique: true,
    maxlength: 25,
  },
});

export default mongoose.model("User", userSchema);
