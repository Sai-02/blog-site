const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const tokenString = req.headers["authorization"];
  if (!tokenString) return res.status(401).json({ msg: "Unauthorized" });
  const token = tokenString.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return res.status(401).json({ msg: "Unauthorized" });
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateUser,
};
