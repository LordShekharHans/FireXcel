const roles = require("../data/roles");
module.exports = (req, res, next) => {
    if (req.user.roleId !== 1) {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};
