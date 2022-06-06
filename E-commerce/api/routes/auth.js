const express = require("express");
const router = express.Router();
const { registerCtrl, loginCtrl, logOut, logError, logDataUserOauth } = require("../controllers/auth");
const { validateRegister, validateLogin, } = require("../validators/auth");
const {loginGoogle, loginCallBackGoogle} = require('../controllers/google-auth');

//auth local
router.post("/register", validateRegister, registerCtrl);
router.post("/login", validateLogin, loginCtrl);

// auth google
router.get("/login/google", loginGoogle);
router.get("/login/google/callback", loginCallBackGoogle);

//recuperar datos del usuario
router.get('/data', logDataUserOauth);

//logout 
router.get("/logout", logOut);
router.get("/login/error", logError);

module.exports = router;