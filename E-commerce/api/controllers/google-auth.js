const passport = require('passport');


const loginGoogle = passport.authenticate('google',{scope: ['openid', 'email', 'profile']},{
        successRedirect : '/api/product/',
        failureRedirect : '/googleerror',
        passReqToCallback :true //IMPORTANTE para poder recibir por req
    })


const loginCallBackGoogle = passport.authenticate('google', { successRedirect : '/api/product/', failureRedirect: '/googleerror' })


module.exports = { loginGoogle, loginCallBackGoogle};