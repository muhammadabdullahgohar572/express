const jwt = require("jsonwebtoken");

const middle = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return;
    res.status(401).json({ error: "Access denied" });

    try {
      const decode = jwt.verify(token, "tokenn");
      req.userId = decode.userId;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports=middle;