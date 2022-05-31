const passport = require('passport');
const uriFrontHome = process.env.frontUrl;

const loginGoogle = passport.authenticate('google',{scope: ['openid', 'email', 'profile']},{
        successRedirect : uriFrontHome,
        failureRedirect : '/api/auth/login/error',
        passReqToCallback :true //IMPORTANTE para poder recibir por req
    });


const loginCallBackGoogle = passport.authenticate('google', { 
    successRedirect : uriFrontHome, 
    failureRedirect: '/api/auth/login/error' });


module.exports = { loginGoogle, loginCallBackGoogle};