const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const validateLogin = [
  check("email").exists().notEmpty(),
  check("password").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateRegister = [
  check("name").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({min:8, max:15}),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
//midleware 
const isAuthenticated= (req,res,next)=>{
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('http://localhost:3000/api/auth/login/googleerror')
}
module.exports = { validateLogin, validateRegister,isAuthenticated };