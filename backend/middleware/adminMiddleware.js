const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin" || !decoded.adminId) {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    req.adminId = decoded.adminId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = adminMiddleware;
