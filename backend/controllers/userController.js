const userService = require("../services/userService");
const { getAuth } = require("@clerk/express");

exports.me = async (req, res) => {
  const auth = getAuth(req);

  try {
    const user = await userService.findOrCreateUser({
      clerkId: auth.userId,
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
