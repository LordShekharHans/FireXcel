const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

// @route POST /api/auth/login
// @desc Login users
// @access Public
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  // check if all fields are filled
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // check if user exists
    const user = await db.users.findOne({
      where: {
        email,
        roleId: role,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    // validate password
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      // get user role
      const role = await db.roles.findOne({
        where: {
          roleId: user.roleId,
        },
      });

      // Generate JWT
      const token = jwt.sign(
        { id: user.userId, role: user.roleId },
        process.env.JWT_SECRET,
        {
          expiresIn: "30 days",
        }
      );

      return res
        .status(200)
        .json({ message: "User logged in", token, user, role });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @route POST /api/auth/register
// @desc Register users
// @access Public
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // check if all fields are filled
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // check if user exists
    const user = await db.users.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await db.users.create({
      name,
      email,
      password: hashedPassword,
      roleId: 4,
    });

    // get user role
    const userRole = await db.roles.findOne({
      where: {
        roleId: newUser.roleId,
      },
    });

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.userId, role: newUser.roleId },
      process.env.JWT_SECRET,
      {
        expiresIn: "30 days",
      }
    );

    return res
      .status(200)
      .json({ message: "User registered", token, newUser, userRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
