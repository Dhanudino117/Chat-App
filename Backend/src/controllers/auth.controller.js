import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import validator from "validator";

export const validateSignupData = (req) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return { error: "All fields are required" };
  }

  if (!validator.isEmail(email)) {
    return { error: "Invalid email address" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  return { valid: true };
};

export const signup = async (req, res) => {
  const validation = validateSignupData(req);

  if (!validation.valid) {
    return res.status(400).json({ message: validation.error });
  }

  try {
    const { fullname, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilepic: newUser.profilepic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error("Error during signup ", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//
export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
