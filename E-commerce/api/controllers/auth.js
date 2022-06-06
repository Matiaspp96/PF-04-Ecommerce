const { encrypt, compare } = require("../utils/handleJwt");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../utils/handleError");
const { tokenSign } = require("../utils/handleToken");
const { userModel } = require("../models");
const { matchedData } = require("express-validator");


const loginCtrl = async (req, res,next) => {
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
    return res.json(data);
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
    res.send({ data })
  } catch (e) {
    handleHttpError(res, e);
  }
};

const logOut = (req,res, next) => {
  
  req.logout(function(err) {  //version nueva requiere pasar un callback
    if (err) { return next(err); }
    req.session.destroy();

    
    res.redirect(process.env.HOST_CLIENT);

  });
   
};
const logDataUserOauth = async (req,res) => {
  let token = await tokenSign(req.user)
  const data = {
   token: token,
   user: req.user,
 };
   return res.json(data)
   
};

const logError = (req,res) => {

   res.send({message : 'error autentacion' });

};
module.exports = { loginCtrl, registerCtrl, logOut, logError, logDataUserOauth };