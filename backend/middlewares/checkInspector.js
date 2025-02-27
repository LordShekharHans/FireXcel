module.exports = (req, res, next) => {
    if (req.user.roleId !== 3) {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};
