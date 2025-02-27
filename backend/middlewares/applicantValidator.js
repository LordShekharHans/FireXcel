const roles = require("../data/roles");

const applicantValidator = async (req, res, next) => {
  try {
    const { roleId } = req.user;

    if (roleId !== roles[3].roleId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = applicantValidator;
