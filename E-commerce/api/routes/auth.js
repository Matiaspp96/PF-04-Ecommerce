const express = require("express");
const router = express.Router();
const { registerCtrl, loginCtrl, logOut, logError } = require("../controllers/auth");
const { validateRegister, validateLogin } = require("../validators/auth");
const {loginGoogle, loginCallBackGoogle} = require('../controllers/google-auth');
const { localAuthSignin, localAuthSignup } = require('../controllers/local-auth');

router.post("/register", validateRegister, registerCtrl);
router.post("/login", validateLogin, loginCtrl);
//ruta auth google
router.get("/login/google", loginGoogle);
router.get("/login/google/callback", loginCallBackGoogle);
//ruta singin y singUp local
router.get("/login/local/signin",localAuthSignin);
router.get("/login/local/signup", localAuthSignup);
//logout 
router.get("/logout", logOut);
router.get("/login/googleerror", logError );

module.exports = router;