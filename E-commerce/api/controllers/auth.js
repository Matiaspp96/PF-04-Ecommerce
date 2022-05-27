const { encrypt, compare } = require("../utils/handleJwt");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../utils/handleError");
const { tokenSign } = require("../utils/handleToken");

const { userModel } = require("../models");
const { matchedData } = require("express-validator");


const loginCtrl = async (req, res) => {
  try {
    const body = matchedData(req);
    const user = await userModel.findOne({ email: body.email });
    if (!user) {
      handleErrorResponse(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const checkPassword = await compare(body.password, user.password);

    if (!checkPassword) {
      handleErrorResponse(res, "PASSWORD_INVALID", 402);
      return;
    }

    const tokenJwt = await tokenSign(user);

    const data = {
      token: tokenJwt,
      user: user,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const registerCtrl = async (req, res) => {
  try {
    const body = req.body;
    
    const checkIsExist = await userModel.findOne({ email: body.email });
    if (checkIsExist) {
      handleErrorResponse(res, "USER_EXISTS", 401);
      return;
    }
    const password = await encrypt(body.password);
    const bodyInsert = { ...body, password };
    console.log(bodyInsert)
    //const {name, email, role } = req.body;
    // let obj = { name,email,role,password }
    // console.log(obj )
    
    const data = await userModel.create(bodyInsert);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const logOut = (req,res) => {
  req.logout(function(err) {  //version nueva requiere pasar un callback
    if (err) { return next(err); }
    res.redirect('/api/auth/login/googleerror');
  });

}

const logError = (req,res) => {
  return res.send('ohhh no ohhhh no')
}
module.exports = { loginCtrl, registerCtrl, logOut, logError };