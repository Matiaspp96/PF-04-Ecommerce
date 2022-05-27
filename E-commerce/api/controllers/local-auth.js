const passport = require('passport');


const localAuthSignin = passport.authenticate('local-signin',{
    successRedirect : '/profile',
    failureRedirect : '/signup',
    passReqToCallback :true //IMPORTANTE para poder recibir por req
}
)
const localAuthSignup = passport.authenticate('local-signup',{
    successRedirect : '/profile',
    failureRedirect : '/signup',
    passReqToCallback :true //IMPORTANTE para poder recibir por req
});

module.exports = { localAuthSignin, localAuthSignup };
