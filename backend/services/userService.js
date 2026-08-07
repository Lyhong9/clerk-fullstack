const { User } = require("../models");

exports.findOrCreateUser = async ({ clerkId, name, email }) => {
  let user = await User.findOne({
    where: {
      clerkId,
    },
  });

  if (user) {
    return user;
  }

  user = await User.create({
    clerkId,
    name,
    email,
    role: "customer",
  });

  return user;
};