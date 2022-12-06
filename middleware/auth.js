const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  // console.log("req" , req.headers['authorization']);
  const authToken = req.headers['authorization']
  // console.log("authToken" , authToken)
  // const token = req.header("token");
  // console.log("token" , token);
  if (!authToken)
    return res.status(401).json({
      message: "Auth Error",
    });
  try {
    const decoded = jwt.verify(authToken, "randomString");
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Invalid Token" });
  }
};
