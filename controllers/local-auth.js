const passport = require('passport');
const uriFrontHome = process.env.frontUrl;

// SE CAMBIO POR AHORA

const localAuthSignin = passport.authenticate('local-signin',{
    successRedirect : uriFrontHome,
    failureRedirect : '/api/auth/login/error',
  
});
const localAuthSignup = passport.authenticate('local-signup',{
    successRedirect : uriFrontHome,
    failureRedirect : '/api/auth/login/error',
    
});


module.exports = { localAuthSignin, localAuthSignup };
