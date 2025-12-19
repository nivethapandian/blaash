const User = require("../models/User");
const sendOtp = require("../utils/sendOtp");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendOtp(email, otp);

    req.session.otp = otp;
    req.session.email = email;
    req.session.password = password;
    // req.session.isNewUser = true;

    // res.status(201).json({ message: 'User registered successfully' });
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    res.status(200).send("Login successful!");
  } else {
    res.status(400).send("Invalid credentials");
  }
};

exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;

  // Log sessions to debug if they are persisting
  console.log("Session Data:", req.session);

  if (Number(otp) === req.session.otp) {
    const hashedPassword = await bcrypt.hash(req.session.password, 10);

    const newUser = new User({
      email: req.session.email,
      password: hashedPassword,
    });

    await newUser.save();

    // request.session.otp = null;

    res.status(200).send("User registered successfully!");
  } else {
    res.status(400).send("Invalid OTP");
  }
};
