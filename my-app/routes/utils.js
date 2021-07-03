function requireAdmin(req, res, next) {
  if (!req.admin) {
    next({
      name: "MissingAdminError",
      message: "You must be an admin to have access to this",
    });
  } else {
    next();
  }
}

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingLogInError",
      message: "You must be a logged in user to perform this action.",
    });
  } else {
    next();
  }
}

module.exports = { requireAdmin, requireUser };
