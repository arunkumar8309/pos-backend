const jwt = require("jsonwebtoken");
const { User } = require("../models/SigninSchema");
const bcrypt = require("bcrypt");

const secretKey = "your-secret-key";

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        const plainUser = user.toObject();
        const Role = plainUser.role;

        if (!user) {
            return res.status(401).json({ status: "401", error: "Invalid credentials" });
        }

        // check email

        const isEmailMatch = email === user.email;
        if (!isEmailMatch) {
            return res.status(401).json({ status: "401", error: "Email Not Matched" });
        }

        //   Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ status: "401", error: "Password Not Matched" });
        }

        const token = jwt.sign({ email, role: Role }, secretKey, { expiresIn: "1h" });
        res.json({ status: 200, message: "Authentication successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};