const permissionMiddleware =
  (allowedRoles = []) =>
  (req, res, next) => {
    const { user } = req;

    if (!allowedRoles.includes(user.role.roleName)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };

module.exports = permissionMiddleware;
