const express = require("express");
const passport = require("passport");
const router = express.Router();
const { registerCtrl, loginCtrl, logOut, logError,forgotPassword,newPassword,logDataUserOauth, emailConfirmation } = require("../controllers/auth");
const { validateRegister, validateLogin } = require("../validators/auth");
const {
  loginGoogleCart,
  loginCallBackGoogleCart,
  loginGoogle,
  loginCallBackGoogle,
} = require("../controllers/google-auth");

//auth local
router.post("/register", validateRegister, registerCtrl);
router.post("/login", validateLogin, loginCtrl);

// auth google
router.get("/login/google", loginGoogle);
router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/login/error",
    passReqToCallback: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.HOST_CLIENT}/userdata?_id=${req.user._id}`);
  }
);

// router.get("/login/google/callback", loginCallBackGoogle);

//ruta de auth google carrito
router.get("/cart/login/google", loginGoogleCart);
router.get("/cart/login/google/callback", loginCallBackGoogleCart);

//recuperar datos del usuario
router.post("/data", logDataUserOauth);

//logout
router.get("/logout", logOut);
router.get("/login/error", logError);

router.post("/olvide-password", forgotPassword);
router.put("/olvide-password/:token", newPassword);

router.get('/confirmmail/:_id', emailConfirmation)

module.exports = router;
