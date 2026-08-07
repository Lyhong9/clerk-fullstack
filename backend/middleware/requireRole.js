const { User } = require("../models"); //to check the user’s role from the database.
const { getAuth } = require("@clerk/express"); //auth.userId

//This allows us to reuse it. Example: requireRole(["admin"]) or requireRole(["admin", "super_admin"])
const requireRole = (roles = []) => {
  return async (req, res, next) => {
    try {
      const auth = getAuth(req);

      // No logged-in user?
      if (!auth.userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // Find the current user in PostgreSQL.
      const user = await User.findOne({
        where: {
          clerkId: auth.userId,
        },
      });

      // User not found?
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check Role
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      // Attach User to Request Object
      req.user = user;

      // User has the required role, proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

module.exports = requireRole;
