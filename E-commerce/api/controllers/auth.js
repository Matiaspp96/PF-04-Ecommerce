const { encrypt, compare } = require("../utils/handleJwt");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../utils/handleError");
const { tokenSign,tokenEmail } = require("../utils/handleToken");
const {SendEmailPassword}=require("../utils/handleEmail")
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
      handleErrorResponse(res, "PASSWORD_INVALID", 404);
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
  console.log(`antes de entrar al try en logDataUserOaut ${req}`)
  try{
    console.log(`entro al try en logDataUserOaut ${req}`)
    if(req.user){
    let token = await tokenSign(req.user)
    const data = {
     token: token,
     user: req.user,
    };
    console.log(data, token)
     return res.json(data)
    }
  } catch(err){
    console.log(err)
  }
};

const logError = (req,res) => {
  return res.send('Error en log')
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await userModel.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const token = await tokenEmail();
    usuario.token = token;
    await usuario.save();
    
    await SendEmailPassword({
      email: usuario.email,
      name: usuario.name,
      token: usuario.token,
    });

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  }  catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};
const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  const usuario = await userModel.findOne({ token });
  if (usuario) {
    const pass = await encrypt(password)
    usuario.password = pass;
    usuario.token = "";
    await usuario.save();
    try {

      res.json({ msg: "Password Modificado Correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

module.exports = { loginCtrl, registerCtrl, logOut, logError,forgotPassword,logDataUserOauth, newPassword};

