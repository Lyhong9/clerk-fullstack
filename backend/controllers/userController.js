const userService = require("../services/userService");
const { getAuth } = require("@clerk/express");

exports.me = async (req, res) => {
  const auth = getAuth(req);

  console.log(auth);
  try {
    const user = await userService.findOrCreateUser({
      clerkId: auth.userId,
      name: auth.sessionClaims?.fullName || "Unknown User",
      email: auth.sessionClaims?.email || "",
    });

    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
