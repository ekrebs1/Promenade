function requireAdmin(req, res, next) {
  if (!req.user || !req.user.admin) {
    next({
      name: "Unauthorized",
      message: "You do not have the authority to access this.",
    });
  } else {
    next();
  }
}

function authUser(req, res, next) {
  const { id } = req.params;
  if (!req.user) {
    next({
      name: "NotLoggedIn",
      message: "You must be logged in to access!",
    });
  } else if (req.user.id != id) {
    next({
      name: "AuthorizationError",
      message: "You do not have access to change this!",
    });
  } else {
    next();
  }
}

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "NotLoggedIn",
      message: "Must be logged in to access!",
    });
  } else {
    next();
  }
}

module.exports = { requireAdmin, requireUser, authUser };
