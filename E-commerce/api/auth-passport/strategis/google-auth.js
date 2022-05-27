const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../../models/users');
const GOOGLE_CLIENT_ID= "741410975960-ijgbar443c3pr4mrtqp8l3gpl3o5n1d0.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const passport = require('passport');
//const {tokenSign, decodeSign, verifyToken } =require('../../utils/handleToken')

// const jwt = require('jsonwebtoken');
// const secret = 'secretodeprueba';

passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser( async(req,id,done)=>{
 
   const user = await Users.findById(id);
   done(null, user)

});


passport.use('google',new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:3000/api/auth/login/google/callback",
    scope: [ 'profile' ],
    passReqToCallback: true
    
  },
  async function(req,accessToken, refreshToken, profile, done) {


    const validateUser = await Users.findOne({
        email : profile.emails[0].value,
        });
   
    if(validateUser){
    
        return done(null,validateUser); //se valida si el email ya exite

    };
    const user = await Users.create({
        email : profile.emails[0].value,
        name : profile.name.givenName,
    });



       done(null,user)
      
  }
));