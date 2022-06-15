const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = require("../../models/users");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const passport = require("passport");

passport.serializeUser((user, cb) => {
  return cb(null, user._id);
});

passport.deserializeUser(async (req, id, cb) => {
  const user = await Users.findById(id);
  return cb(null, user);
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/auth/login/google/callback`,
      scope: ["openid", "email", "profile"],
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, cb) {
      const email = profile.emails[0].value;
      const name = profile.name.givenName;
      const avatar = profile.photos[0].value;
      const validateUser = await Users.findOne({ email });

      if (validateUser) {
        return cb(null, validateUser); //se valida si el email ya exite
      }
      const user = await Users.create({ email, name, avatar });

      return cb(null, user);
    }
  )
);
