const express = require("express");
const router = express.Router();
const { registerCtrl, loginCtrl, logOut, logError,forgotPassword,newPassword } = require("../controllers/auth");
const { validateRegister, validateLogin, isAuthenticated } = require("../validators/auth");
const {loginGoogle, loginCallBackGoogle, loginGoogleCart, loginCallBackGoogleCart} = require('../controllers/google-auth');
const { localAuthSignin, localAuthSignup } = require('../controllers/local-auth');

router.post("/register", validateRegister, registerCtrl);
router.post("/login", validateLogin, loginCtrl);

// auth google
router.get("/login/google", loginGoogle);
router.get("/login/google/callback", loginCallBackGoogle);

//ruta de auth google carrito
router.get("/cart/login/google", loginGoogleCart);
router.get("/cart/login/google/callback", loginCallBackGoogleCart);

//auth local
router.post("/login/local/signin",localAuthSignin);
router.post("/login/local/signup",localAuthSignup);

//recuperar datos del usuario
router.get('/data',isAuthenticated,(req,res)=>{
     res.json(req.user)
});

//logout 
router.get("/logout", logOut);
router.get("/login/error", logError);


router.post("/olvide-password", forgotPassword);
router.put("/olvide-password/:token",newPassword);

module.exports = router;