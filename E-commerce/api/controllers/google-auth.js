const passport = require('passport');


const loginGoogle = passport.authenticate('google',{scope: ['openid', 'email', 'profile']},{
        successRedirect : `${process.env.HOST_CLIENT}/userdata`,
        failureRedirect : '/api/auth/login/error',
        passReqToCallback :true //IMPORTANTE para poder recibir por req
    });


const loginCallBackGoogle = passport.authenticate('google', { 
    successRedirect : `${process.env.HOST_CLIENT}/userdata`, 
    failureRedirect: '/api/auth/login/error',
    passReqToCallback :true //IMPORTANTE para poder recibir por req 
});


const loginGoogleCart = passport.authenticate('google',{scope: ['openid', 'email', 'profile']},{
        successRedirect : `${process.env.HOST_CLIENT}/checkout/order`,
        failureRedirect : '/api/auth/login/error',
        passReqToCallback :true //IMPORTANTE para poder recibir por req
    });


const loginCallBackGoogleCart = passport.authenticate('google', { 
    successRedirect : `${process.env.HOST_CLIENT}/checkout/order`, 
    failureRedirect: '/api/auth/login/error',
    passReqToCallback :true //IMPORTANTE para poder recibir por req
 });


module.exports = { loginGoogle, loginCallBackGoogle, loginGoogleCart, loginCallBackGoogleCart};