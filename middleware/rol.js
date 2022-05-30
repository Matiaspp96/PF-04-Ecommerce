const { verifyToken } = require("../utils/handleToken");
const { handleErrorResponse } = require("../utils/handleError");
const { userModel } = require("../models");

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleErrorResponse(res, "NOT_ALLOW", 409);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await userModel.findById(tokenData._id);

    const rolesar=[].push(roles)

    if ([].concat(roles).includes(userData.role[0])) {
      next();
    } else {
      handleErrorResponse(res, "NOT_ROL", 409);
    }
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = checkRoleAuth;