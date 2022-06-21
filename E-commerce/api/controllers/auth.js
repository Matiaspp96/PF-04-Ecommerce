const { encrypt, compare } = require("../utils/handleJwt");
const { emailer, transporter } = require('../config/email.js')
const {
  handleHttpError,
  handleErrorResponse,
} = require("../utils/handleError");
const { tokenSign, tokenEmail } = require("../utils/handleToken");
const { SendEmailPassword } = require("../utils/handleEmail");
const { userModel } = require("../models");
const { matchedData } = require("express-validator");

const loginCtrl = async (req, res, next) => {
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

    const data = await userModel.create({
      email: body.email,
      name: body.name,
      password,
    });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const logOut = (req, res, next) => {
  req.logout(function (err) {
    //version nueva requiere pasar un callback
    if (err) {
      return next(err);
    }
    req.session.destroy();

    res.redirect(process.env.HOST_CLIENT);
  });
};

const logDataUserOauth = async (req, res) => {
  console.log("Entro aca");

  console.log(`esto es req.body ${req.body._id}`);
  try {
    const user = await userModel.findById(req.body._id);
    console.log(`Esto es linea 81 user:${user}`);
    let token = await tokenSign(user);
    const data = {
      token: token,
      user: user,
    };

    return res.json(data);
    // return res.json(data)
    // } else throw new Error('hola')
  } catch (err) {
    console.log(err);
  }
};
const logError = (req, res) => {
  return res.send("Error en log");
};

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
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await userModel.findOne({ token });

  if (usuario) {
    const pass = await encrypt(password);
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

const emailConfirmation = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await userModel.findById(_id);
  if(user){
    user.emailConfirmed = true;
    await user.save();
    return  res.status(201).redirect(process.env.HOST_CLIENT);
  }else{
    res.json({ msg: "User not found" });
  }

  } catch (error) {
    return res.status(404).json({ msg: error });
  }

}

module.exports = { loginCtrl, registerCtrl, logOut, logError,forgotPassword,logDataUserOauth, newPassword, emailConfirmation};

