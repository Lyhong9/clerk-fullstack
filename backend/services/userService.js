const { User } = require("../models");
const clerkClient = require("../config/clerk");

exports.findOrCreateUser = async ({ clerkId }) => {
  let user = await User.findOne({
    where: {
      clerkId,
    },
  });

  if (user) {
    return user;
  }

  const clerkUser = await clerkClient.users.getUser(clerkId);

  const email = clerkUser.emailAddresses[0]?.emailAddress;

  const firstName = clerkUser.firstName || "";
  const lastName = clerkUser.lastName || "";

  const name = `${firstName} ${lastName}`.trim();

  user = await User.create({
    clerkId,
    name,
    email,
    role: "customer",
  });

  return user;
};