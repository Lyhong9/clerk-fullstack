exports.home = (req, res) => {
  res.json({
    message: "Express API is running 🚀",
  });
};

exports.profile = (req, res) => {
  res.json({
    message: "Protected Route",
    userId: req.auth.userId,
  });
};