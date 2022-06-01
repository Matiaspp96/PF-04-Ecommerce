const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../../models/users');

passport.serializeUser((user,done)=>{
    console.log(user)
    return done(null,user);
});

passport.deserializeUser( async(user,done)=>{
    const {_id} =user
   const userValidate = await Users.findById(_id);
   return done(null, userValidate)
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    //passReqToCallback: true // nos permite recibit por req en el callback
},async (email, password, done )=>{

    const validateUser = await Users.findOne({email:email});
   
    if(validateUser){//se le pasa segundo argumento como false!
        return done(null,false,{message:'usuario ya registrado'}); //se valida si el email ya exite
    };
    const user = new Users();
    user.email = email;
    user.password = user.encryptPassword(password);
    await user.save();
    
    return done(null,user)
    
}));

passport.use('local-signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // nos permite recibit por req en el callback
},async (req,email, password, cb )=>{

    const user = await Users.findOne({email});

    if(!user){//se le pasa segundo argumento como false!
        return cb(null,false); //se valida si el email ya exite
    };
    if(!user.comparePassword(password)){
        return cb(null,false,{message:'usuario no esxiste'});
    };

    return cb(null,user)
}));



