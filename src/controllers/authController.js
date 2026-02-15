const jwt = require("jsonwebtoken");
const authService = require("../services/authService");

exports.register = async (req, res) => {
  await authService.createUser(req.body);
  res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUserByEmail(email);

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.json({ token });
};
