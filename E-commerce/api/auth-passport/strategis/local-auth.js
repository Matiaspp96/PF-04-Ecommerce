const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../../models/users');

const secret = 'secretodeprueba';

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser( async(id,done)=>{
   const user = await Users.findById(id);
   done(null, user)
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // nos permite recibit por req en el callback
},async (req,email, password, done )=>{

    const validateUser = await Users.findOne({email:email});
   
    if(validateUser){//se le pasa segundo argumento como false!
        return done(null,false,{message:'usuario ya registrado'}); //se valida si el email ya exite
    };
    const user = new Users();
    user.email = email;
    user.password = user.encryptPassword(password);
    await user.save();

    done(null,user)
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // nos permite recibit por req en el callback
},async (req,email, password, done )=>{

    const validateUser = await Users.findOne({email:email});
 
    if(!validateUser){//se le pasa segundo argumento como false!
        return done(null,false,{message:'email no existe'}); //se valida si el email ya exite
    };
    if(!validateUser.comparePassword(password)){
        return done(null,false,{message:'password incorrecto'});
    };
   
    return  done(null,validateUser)
}));