const jwt = require("express-jwt");
require("dotenv").config();

module.exports = authorize;

function authorize(accessItem: any, operation: any) {
  const accessToken = process.env.ACCESS_TOKEN_SECRET;

  if (!accessToken) {
    throw new Error("JWT secret is not defined. Make sure it is set in the environment.");
  }

  return [
    // Authenticate JWT token and attach decoded token to request as req.user
    jwt({ secret: accessToken, algorithms: ["HS256"] }),

    // Error handling for JWT authentication
    (err: any, req: any, res: any, next: any) => {
      if (err && err.name === "UnauthorizedError") {
        return res.status(401).json({ message: "Token has expired or is invalid" });
      }
      next(err);
    },

    // Authorization logic
    async (req: any, res: any, next: any) => {
      try {
        const userId = req.user?.userInfo?.userId; // Extract userId from JWT token
        req.userId = userId; // Attach userId to req for subsequent routes
        next();
      } catch (error) {
        return res.status(500).json({ message: "Server error during authorization" });
      }
    },
  ];
}
