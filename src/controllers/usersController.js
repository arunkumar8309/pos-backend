const userModel = require("../models/userSchema");
const bcrypt = require('bcrypt');

const userController = {};

userController.Insert = async (req, res) => {
  console.log("post api hit", req.body);

  try {
    // Check if the mobile_no already exists in the database
    const existingMobileUser = await userModel.findOne({ mobile_no: req.body.mobile_no });

    if (existingMobileUser) {
      // If mobile_no already exists, return an error response
      return res.status(409).json({ status: "409", error: "Mobile number already exists" });
    }

    // Check if the email already exists in the database
    const existingEmailUser = await userModel.findOne({ email: req.body.email });

    if (existingEmailUser) {
      // If email already exists, return an error response
      return res.status(409).json({ status: "409", error: "Email already exists" });
    }

    // Check if the role already exists in the database
    const existingRoleUser = await userModel.findOne({ role: req.body.role });

    if (existingRoleUser) {
      // If role already exists, return an error response
      return res.status(409).json({ status: "409", error: "This role already exists" });
    }
    // If mobile_no doesn't exist, proceed to save the new user
    const newUser = new userModel({
      created_at: new Date(),
      mobile_no: req.body.mobile_no,
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      c_password: req.body.c_password,
      role: req.body.role,
    });
    // password increpet formate code

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const hashedCPassword = await bcrypt.hash(req.body.c_password, saltRounds);

    // Assign the hashed password to the newUser object
    newUser.password = hashedPassword;
    newUser.c_password = hashedCPassword;

    await newUser.save();
    res.status(200).json({ status: "200", message: "Registration Successful!" });
  } catch (error) {
    // Handle other errors
    res.status(500).json({ status: "500", error: "Error occurred while saving user data" });
  }
};


module.exports = userController;
